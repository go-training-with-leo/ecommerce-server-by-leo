import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@/api/user/user.module';

import { Code } from './entities';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { MailModule } from '@/mail/mail.module';

@Module({
  imports: [
    forwardRef(() => MailModule),
    UserModule,
    TypeOrmModule.forFeature([Code]),
  ],
  controllers: [CodeController],
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule {}
