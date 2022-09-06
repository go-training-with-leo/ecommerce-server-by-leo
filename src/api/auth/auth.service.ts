import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserService } from '@/api/user/user.service';
import { TokenService } from '@/api/token/token.service';

import type { User } from '@/api/user/user.entity';

import {
  UserAlreadyException,
  WrongCredentialsException,
} from './auth.exceptions';

import { RegisterDto } from './dto';
import type { ITokenPayload, IValidateUserParams } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  public async register(userInfo: RegisterDto): Promise<User> {
    const { email, phoneNumber } = userInfo;

    const user = await this.userService.findOneByEmailOrPhoneNumber({
      email,
      phoneNumber,
    });

    if (user) {
      throw new UserAlreadyException();
    }

    return this.userService.create(userInfo);
  }

  public async login(
    userInfo: User,
  ): Promise<{ accessToken: string; userInfo: User }> {
    const { id, email } = userInfo;

    const payload: ITokenPayload = {
      email,
    };

    const accessToken = this.jwtService.sign(payload);

    this.tokenService.create({
      userId: id,
      accessToken,
    });

    return {
      accessToken,
      userInfo: userInfo,
    };
  }

  public async validateUser({
    email,
    password,
  }: IValidateUserParams): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    if (!(user && compareSync(password, user?.password))) {
      throw new WrongCredentialsException();
    }

    return user;
  }
}
