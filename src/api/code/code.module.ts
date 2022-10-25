import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '@/api/user/user.module';

import { Code } from './entities';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Code])],
  controllers: [CodeController],
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule {}
