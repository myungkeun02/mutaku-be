import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalServiceStrategy } from './strategies/local-service.strategy';
import { jwtServiceStrategy } from './strategies/jwt-service.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1y' },
        httpOnly: true,
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ session: false }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [AuthService, LocalServiceStrategy, jwtServiceStrategy],
  exports: [AuthService, TypeOrmModule.forFeature([User])], // TypeOrmModule.forFeature([User])를 exports에 추가
})
export class AuthModule {}
