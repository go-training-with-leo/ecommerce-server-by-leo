import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

import { CodeAction } from '@/common/enums';

export class CreateCodeDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ type: 'uuid' })
  code: string;

  @IsNotEmpty()
  @ApiProperty({
    enum: CodeAction,
    default: CodeAction[CodeAction.RESET_PASSWORD],
  })
  action: CodeAction;

  @IsNotEmpty()
  @ApiProperty()
  expiresIn: number;
}
