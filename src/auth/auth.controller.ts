import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
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
    try {
      const savedUser = await this.authService.signUp(signUpDto);
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(LocalServiceGuard)
  @Post('login')
  async login(@Req() req, @Body() loginDto: LoginDto, @Res() res) {
    try {
      const _token = await this.authService.loginWithCreateToken(req.user, res);
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
