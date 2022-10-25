import { v4 as uuid } from 'uuid';
import { Body, Param } from '@nestjs/common';
import { InjectController, InjectRoute } from '@/decorators';

import codeRoutes from './code.routes';
import { CodeService } from './code.service';

import {
  CreateCodeDto,
  CreatedCodeDto,
  GotCodeDto,
  UpdateCodeDto,
  UpdatedCodeDto,
} from './dto';

@InjectController({ name: codeRoutes.index })
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @InjectRoute(codeRoutes.create)
  public async create(
    @Body() codeInfo: CreateCodeDto,
  ): Promise<CreatedCodeDto> {
    const code = uuid();

    const createdCode = await this.codeService.create({ ...codeInfo, code });

    return createdCode;
  }

  @InjectRoute(codeRoutes.getAll)
  public async getAll(): Promise<GotCodeDto[]> {
    const gotCodes = await this.codeService.getAll();

    return gotCodes;
  }

  @InjectRoute(codeRoutes.updateById)
  public async updateById(
    @Param('id') id: string,
    @Body() updateInfo: UpdateCodeDto,
  ): Promise<UpdatedCodeDto> {
    const updatedUser = await this.codeService.updateById({
      id,
      updateInfo,
    });

    return updatedUser;
  }

  @InjectRoute(codeRoutes.deleteById)
  public async deleteById(@Param('id') id: string): Promise<string> {
    await this.codeService.deleteById(id);

    return id;
  }
}
