import { compareSync } from 'bcrypt';
import { add, isBefore } from 'date-fns';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { hash } from '@/utils/helpers';
import { MailService } from '@/mail/mail.service';
import { CodeAction, CodeStatus } from '@/common/enums';
import { UserService } from '@/api/user/user.service';
import { CodeService } from '@/api/code/code.service';
import { TokenService } from '@/api/token/token.service';

import type { User } from '@/api/user/entities';
import type { ICodeInfoParams } from '@/api/code/code.service';

import {
  UserAlreadyException,
  WrongCredentialsException,
  NotMatchPasswordResetException,
  InvalidPasswordResetCodeException,
} from './auth.exceptions';

import type {
  RegisterDto,
  LoggedInDto,
  RegisteredDto,
  ResetPassword,
  VerifyPasswordResetCode,
} from './dto';
import type { ITokenPayload, IValidateUserParams } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
    private userService: UserService,
    private codeService: CodeService,
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

  private async checkExistedUserByEmail(email: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new WrongCredentialsException();
    }

    return user;
  }

  public async forgetPassword(email: string): Promise<string> {
    const user = await this.checkExistedUserByEmail(email);

    await this.mailService.sendPasswordResetCode(user);

    return user?.email;
  }

  private async handleUpdateCodeStatusByActionInfo({
    status,
    actionInfo,
  }: {
    status: CodeStatus;
    actionInfo: VerifyPasswordResetCode | ResetPassword;
  }): Promise<void> {
    const { email, code } = actionInfo;
    const codeInfo: ICodeInfoParams = {
      code,
      email,
      action: CodeAction.RESET_PASSWORD,
    };

    const passwordResetCode = await this.codeService.getByCode(codeInfo);

    const currDate = new Date();
    const isExpiredCode = isBefore(
      add(passwordResetCode.createdAt, {
        seconds: passwordResetCode.expiresIn / 1000,
      }),
      add(currDate, { minutes: currDate.getTimezoneOffset() }),
    );

    const isInvalidCode = isExpiredCode || passwordResetCode.status >= status;
    if (isInvalidCode) {
      throw new InvalidPasswordResetCodeException();
    }

    await this.codeService.updateStatus({
      status,
      codeInfo,
    });
  }

  public async verifyPasswordResetCode(
    verificationInfo: VerifyPasswordResetCode,
  ): Promise<string> {
    const { email } = verificationInfo;
    const user = await this.checkExistedUserByEmail(email);

    await this.handleUpdateCodeStatusByActionInfo({
      actionInfo: verificationInfo,
      status: CodeStatus.IS_VERIFIED,
    });

    return user?.email;
  }

  public async resetPassword(resetInfo: ResetPassword): Promise<string> {
    const { email } = resetInfo;
    const user = await this.checkExistedUserByEmail(email);

    await this.handleUpdateCodeStatusByActionInfo({
      actionInfo: resetInfo,
      status: CodeStatus.IS_USED,
    });

    const { newPassword, confirmPassword } = resetInfo;
    if (newPassword !== confirmPassword) {
      throw new NotMatchPasswordResetException();
    }

    const saltRounds = 10;

    const hashedPassword = await hash.generateWithBcrypt({
      source: newPassword,
      salt: saltRounds,
    });

    await this.userService.resetPassword({ user, newPassword: hashedPassword });

    return user?.email;
  }
}
