import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signUp.dto';
import { LocalServiceGuard } from './guards/local-service.guard';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignupDto) {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      await this.authService.checkDuplicateEmail(signUpDto.email, queryRunner);
      await this.authService.checkDuplicateName(signUpDto.name, queryRunner);

      const hashedPassword = await this.authService.hashPassword(
        signUpDto.password,
      );

      signUpDto.password = hashedPassword;

      // User 엔티티를 생성하고 저장
      const user = this.userRepository.create({
        name: signUpDto.name,
        email: signUpDto.email,
        password: hashedPassword,
      });

      return this.authService.signUp(user);
    } catch (error) {
      // 롤백 처리
      await queryRunner.rollbackTransaction();
      throw error; // 에러를 다시 던져서 호출자에게 전달
    } finally {
      // 쿼리 러너 연결 해제
      await queryRunner.release();
    }
  }

  @UseGuards(LocalServiceGuard)
  @Post('login')
  async login(@Req() req, @Body() loginDto: LoginDto) {
    try {
      const _token = this.authService.login(req.user);
      return { token: _token, dto: loginDto };
    } catch (error) {
      console.error(error);
      return {
        message: '로그인 중 에러가 발생했습니다.',
        error: 'Unauthorized',
        statusCode: 401,
      };
    }
  }
}
