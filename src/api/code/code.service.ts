import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CodeAction, CodeStatus } from '@/common/enums';

import { Code } from './entities';
import { WrongCodeInformationException } from './code.exceptions';

import type { CreateCodeDto } from './dto';

export interface ICodeInfoParams {
  code: string;
  email: string;
  action: CodeAction;
}

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
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
