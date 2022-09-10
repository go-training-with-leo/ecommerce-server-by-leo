import { Body } from '@nestjs/common';

import { AuthService } from '@/api/auth/auth.service';
import {
  RegisterDto,
  RegisteredDto,
  ForgetPasswordDto,
  VerifyPasswordResetCode,
  ResetPassword,
} from '@/api/auth/dto';
import { InjectRoute, InjectController, ReqUser } from '@/decorators';

import type { User } from '@/api/user/entities';

import authRoutes from './auth.routes';

import type { LoggedInDto } from './dto';

@InjectController({ name: authRoutes.index, isCore: true })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @InjectRoute(authRoutes.register)
  public async register(@Body() userInfo: RegisterDto): Promise<RegisteredDto> {
    const registeredUser = await this.authService.register(userInfo);

    return registeredUser;
  }

  @InjectRoute(authRoutes.login)
  public async login(@ReqUser() user: User): Promise<LoggedInDto> {
    const loggedInUser = await this.authService.login(user);

    return loggedInUser;
  }

  @InjectRoute(authRoutes.forgetPassword)
  public async forgetPassword(
    @Body() userInfo: ForgetPasswordDto,
  ): Promise<string> {
    const sentEmail = await this.authService.forgetPassword(userInfo?.email);

    return sentEmail;
  }

  @InjectRoute(authRoutes.verifyPasswordResetCode)
  public async verifyPasswordResetCode(
    @Body() verificationInfo: VerifyPasswordResetCode,
  ): Promise<string> {
    const verifiedEmail = await this.authService.verifyPasswordResetCode(
      verificationInfo,
    );

    return verifiedEmail;
  }

  @InjectRoute(authRoutes.resetPassword)
  public async resetPassword(
    @Body() resetInfo: ResetPassword,
  ): Promise<string> {
    const resetEmail = await this.authService.resetPassword(resetInfo);

    return resetEmail;
  }
}
