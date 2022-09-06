import { Request } from 'express';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '@/api/auth/auth.service';

import type { User } from '@/api/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<User> {
    const user = await this.authService.validateUser(req.body);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
