import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';

import { enumh } from '@/utils/helpers';
import { CodeAction } from '@/common/enums';
import { IsValidCodeAction } from '@/decorators';

export class UpdateCodeDto {
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({
    format: 'email',
  })
  email: string;

  @IsValidCodeAction()
  @IsOptional()
  @ApiPropertyOptional({
    enum: CodeAction,
    default: CodeAction[enumh?.getFirstValue<typeof CodeAction>(CodeAction)],
  })
  action: CodeAction;

  @IsOptional()
  @ApiPropertyOptional({ example: 30000 })
  expiresIn: number;
}
