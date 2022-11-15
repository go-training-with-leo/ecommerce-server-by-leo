import {
  Inject,
  forwardRef,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@/api/user/entities';
import { MailService } from '@/mail/mail.service';
import { UserService } from '@/api/user/user.service';
import { CodeAction, CodeStatus } from '@/common/enums';
import { WrongCredentialsException } from '@/api/auth/auth.exceptions';

import { Code } from './entities';
import { WrongCodeInformationException } from './code.exceptions';

import type {
  GotCodeDto,
  CreateCodeDto,
  UpdateCodeDto,
  UpdatedCodeDto,
  VerifyCouponDto,
} from './dto';

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

    private userService: UserService,

    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
  ) {}

  public async create(
    codeInfo: CreateCodeDto & { code: string },
  ): Promise<GotCodeDto> {
    const user = await this.userService.getByEmail(codeInfo?.email);

    if (!user) {
      throw new NotFoundException();
    }

    const createdCode = this.codeRepository.create(codeInfo);

    await this.codeRepository.save(createdCode);

    return createdCode.toResponse();
  }

  public async getById(id: string): Promise<GotCodeDto> {
    const code = await this.codeRepository.findOne({
      where: { id },
    });

    if (!code) {
      throw new NotFoundException();
    }

    return code.toResponse();
  }

  public async getAll(): Promise<GotCodeDto[]> {
    const codes = await this.codeRepository.find();

    return codes.map((code) => code.toResponse());
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

  public async updateById({
    id,
    updateInfo,
  }: {
    id: string;
    updateInfo: UpdateCodeDto;
  }): Promise<UpdatedCodeDto> {
    const code = await this.getById(id);

    const updatedCode = await this.codeRepository.create({
      ...code,
      ...updateInfo,
    });

    await this.codeRepository.save(updatedCode);

    return updatedCode;
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.codeRepository.delete({ id });
  }

  public async createCoupon(email: string): Promise<string> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new WrongCredentialsException();
    }

    await this.mailService.sendCouponCode(user);

    return user?.email;
  }

  public async verifyCoupon({
    verifyInfo,
    user,
  }: {
    user: User;
    verifyInfo: VerifyCouponDto;
  }): Promise<GotCodeDto> {
    const code = await this.codeRepository.findOne({
      where: {
        code: verifyInfo?.code,
        email: user?.email,
        action: CodeAction.DISCOUNT,
      },
    });

    if (!code) {
      throw new NotFoundException();
    }

    return code.toResponse();
  }
}
