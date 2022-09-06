import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@/api/user/user.service';

import type { User } from '@/api/user/user.entity';
import type { ITokenPayload } from '@/api/auth/auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate({ email }: ITokenPayload): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    return user;
  }
}
