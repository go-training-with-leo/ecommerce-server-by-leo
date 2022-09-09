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

import type { RegisterDto, LoggedInDto, RegisteredDto } from './dto';

import type { ITokenPayload, IValidateUserParams } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  public async register(userInfo: RegisterDto): Promise<RegisteredDto> {
    const { email, phoneNumber } = userInfo;

    const user = await this.userService.findOneByEmailOrPhoneNumber({
      email,
      phoneNumber,
    });

    if (user) {
      throw new UserAlreadyException();
    }

    const registeredUser = await this.userService.create(userInfo);

    return registeredUser;
  }

  public async login(user: User): Promise<LoggedInDto> {
    const { email, role } = user;

    const payload: ITokenPayload = {
      email,
      role,
    };

    const accessToken = this.jwtService.sign(payload);

    await this.tokenService.create({
      accessToken,
      createdBy: user,
    });

    return {
      accessToken,
      userInfo: user.toResponse(),
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
