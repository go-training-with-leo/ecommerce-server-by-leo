import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID } from 'class-validator';

import { enumh } from '@/utils/helpers';
import { CodeAction } from '@/common/enums';
import { ActionedBaseDto } from '@/common/dto';
import { IsValidCodeAction } from '@/decorators';

export class GotCodeDto extends ActionedBaseDto {
  @IsEmail()
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  code: string;

  @IsValidCodeAction()
  @ApiProperty({
    enum: CodeAction,
    default: CodeAction[enumh?.getFirstValue<typeof CodeAction>(CodeAction)],
  })
  action: CodeAction;

  @ApiProperty({ example: 30000 })
  expiresIn: number;
}
