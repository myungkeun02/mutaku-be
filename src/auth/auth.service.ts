import {
  BadRequestException,
  Injectable,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { QueryRunner, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LocalServiceGuard } from './guards/local-service.guard';
import { Response, Request } from 'express';
@Injectable()
export class AuthService {
  authService: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 11);
  }

  async checkDuplicateEmail(email: string, queryRunner?: QueryRunner) {
    try {
      const manager = queryRunner.manager;

      const user = await manager.findOne(User, {
        where: { email },
        withDeleted: true,
      });

      if (user) {
        throw new BadRequestException('이미 계정 생성된 이메일입니다.');
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        '중복된 이메일 확인 중 오류가 발생했습니다.',
      );
    }
  }

  async checkDuplicateName(name: string, queryRunner?: QueryRunner) {
    try {
      const manager = queryRunner ? queryRunner.manager : this.userRepo.manager;

      const user = await manager.findOne(User, {
        where: { name },
      });

      if (user) {
        throw new BadRequestException('중복된 이름입니다.');
      }
    } catch (error) {
      throw new BadRequestException('중복된 이름 확인 중 오류가 발생했습니다.');
    }
  }

  async signUp(signUpDto: SignupDto): Promise<User> {
    const queryRunner = this.userRepo.manager.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction('SERIALIZABLE');

      await this.checkDuplicateEmail(signUpDto.email, queryRunner);
      await this.checkDuplicateName(signUpDto.name, queryRunner);

      const hashedPassword = await this.hashPassword(signUpDto.password);
      signUpDto.password = hashedPassword;

      const user = this.userRepo.create({
        name: signUpDto.name,
        email: signUpDto.email,
        password: hashedPassword,
      });

      const savedUser = await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('회원 가입 중 오류가 발생했습니다.');
    } finally {
      await queryRunner.release();
    }
  }

  async validateServiceUser(email: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('등록되지 않은 사용자입니다.');
    }

    // DB에 저장된 비밀번호와 전달받은 비밀번호 비교
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return user;
  }

  @UseGuards(LocalServiceGuard)
  async loginWithCreateToken(user: User, @Res() res: Response) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    res.cookie('access-token', accessToken, { httpOnly: true });
    res.cookie('refresh-token', refreshToken, { httpOnly: true });

    user.refresh_token = refreshToken;
    await this.userRepo.save(user);
    console.log(accessToken, refreshToken, user);
    return accessToken;
  }

  async refreshAccessToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<string> {
    try {
      const user = await this.userRepo.findOne({
        where: { refresh_token: req.cookies['refresh-token'] },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
      };

      const newAccessToken = await this.jwtService.sign(payload, {
        expiresIn: '15m',
      });
      res.cookie('access-token', newAccessToken, { httpOnly: true });

      const newRefreshToken = await this.jwtService.sign(payload, {
        expiresIn: '7d',
      });

      res.cookie('refresh-token', newRefreshToken, { httpOnly: true });
      user.refresh_token = newRefreshToken;
      await this.userRepo.save(user);

      console.log(newAccessToken, newRefreshToken);
      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
