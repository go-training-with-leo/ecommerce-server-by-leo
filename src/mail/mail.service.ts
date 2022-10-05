import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { CodeAction } from '@/common/enums';
import { CodeService } from '@/api/code/code.service';

import type { User } from '@/api/user/entities';

@Injectable()
export class MailService {
  constructor(
    private codeService: CodeService,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  public async sendPasswordResetCode(user: User): Promise<void> {
    const { email } = user;
    const code = uuid();

    const codeInfo = {
      code,
      email,
      action: CodeAction.RESET_PASSWORD,
      expiresIn: this.configService.get('code.resetPassword.lifetime'),
    };

    await this.codeService.create(codeInfo);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset your password',
      template: './reset-password',
      context: {
        code: code,
        name: user.fullName(),
      },
    });
  }
}
