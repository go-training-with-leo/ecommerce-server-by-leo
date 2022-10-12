import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID, Matches } from 'class-validator';

import { enumh } from '@/utils/helpers';
import { CodeAction } from '@/common/enums';

const CODE_ACTION_REGEX = enumh?.convertToRegex<typeof CodeAction>(CodeAction);
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

  @Matches(CODE_ACTION_REGEX, 'i', {
    message: `$property must match ${CODE_ACTION_REGEX}.`,
  })
  @IsNotEmpty()
  @ApiProperty({
    enum: CodeAction,
    default: CodeAction[CodeAction.RESET_PASSWORD],
  })
  action: CodeAction;

  @IsNotEmpty()
  @ApiProperty({ example: 30000 })
  expiresIn: number;
}
