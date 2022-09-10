import { UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Action, CodeStatus } from '@/common/enums';

import { Code } from './entities';
import { CodeRepository } from './code.repository';
import { WrongCodeInformationException } from './code.exceptions';

import type { CreateCodeDto } from './dto';

export interface ICodeInfoParams {
  code: string;
  email: string;
  action: Action;
}

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private codeRepository: CodeRepository,
  ) {}

  public async create(codeInfo: CreateCodeDto): Promise<Code> {
    const createdCode = this.codeRepository.create(codeInfo);

    await this.codeRepository.save(createdCode);

    return createdCode;
  }

  public async getByCode(codeInfo: ICodeInfoParams): Promise<Code> {
    const code = await this.codeRepository.findOneBy(codeInfo);

    if (!code) {
      throw new WrongCodeInformationException();
    }

    return code;
  }

  public async updateStatus({
    codeInfo,
    status,
  }: {
    codeInfo: ICodeInfoParams;
    status: CodeStatus;
  }): Promise<UpdateResult> {
    return await this.codeRepository.update(codeInfo, {
      status,
    });
  }
}
