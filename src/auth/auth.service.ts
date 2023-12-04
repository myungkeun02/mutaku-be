import {
  BadRequestException,
  Injectable,
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

@Injectable()
export class AuthService {
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

  async signUp(signUpDto: SignupDto, queryRunner?: QueryRunner) {
    try {
      const manager = queryRunner ? queryRunner.manager : this.userRepo.manager;

      return await manager.save(this.userRepo.create(signUpDto));
    } catch (error) {
      throw new BadRequestException('회원 가입 중 오류가 발생했습니다.');
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
  login(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
