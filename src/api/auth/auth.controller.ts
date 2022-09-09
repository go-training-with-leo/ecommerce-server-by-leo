import { Body } from '@nestjs/common';

import { AuthService } from '@/api/auth/auth.service';
import { RegisterDto, RegisteredDto } from '@/api/auth/dto';
import { InjectRoute, InjectController, ReqUser } from '@/decorators';

import type { User } from '@/api/user/user.entity';

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
}
