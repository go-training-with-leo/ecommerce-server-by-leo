import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { enumh } from '@/utils/helpers';
import { CodeAction } from '@/common/enums';
import { IsValidCodeAction } from '@/decorators';

export class CreateCodeDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @IsValidCodeAction()
  @IsNotEmpty()
  @ApiProperty({
    enum: CodeAction,
    default: CodeAction[enumh?.getFirstValue<typeof CodeAction>(CodeAction)],
  })
  action: CodeAction;

  @IsNotEmpty()
  @ApiProperty({ example: 30000 })
  expiresIn: number;
}
