// src/users/users.module.ts
import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
