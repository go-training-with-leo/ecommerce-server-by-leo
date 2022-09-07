import { Body } from '@nestjs/common';

import { RegisterDto } from '@/api/auth/dto';
import { AuthService } from '@/api/auth/auth.service';
import { InjectRoute, InjectController, ReqUser } from '@/decorators';

import type { User } from '@/api/user/user.entity';

import authRoutes from './auth.routes';

@InjectController({ name: authRoutes.index, isCore: true })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @InjectRoute(authRoutes.register)
  public async register(@Body() userInfo: RegisterDto): Promise<User> {
    const createdUser = await this.authService.register(userInfo);

    return createdUser;
  }

  @InjectRoute(authRoutes.login)
  public async login(@ReqUser() user: User): Promise<{
    userInfo: User;
    accessToken: string;
  }> {
    const loggedInUser = await this.authService.login(user);

    return loggedInUser;
  }
}
