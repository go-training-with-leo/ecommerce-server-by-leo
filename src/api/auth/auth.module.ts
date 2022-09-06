import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '@/api/user/user.module';
import { TokenModule } from '@/api/token/token.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    UserModule,
    TokenModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('token.authentication.lifetime') / 1000, // default unit of jwtOptions:expiresIn  is second, so we must divide 1000 (ms)
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
