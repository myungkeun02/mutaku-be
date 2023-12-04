import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtServiceAuthGuard } from 'src/auth/guards/jwt-service-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtServiceAuthGuard)
  @Get('profile')
  async getProfile() {
    return {
      result: true,
      message: '내 정보를 조회합니다.',
    };
  }
}
