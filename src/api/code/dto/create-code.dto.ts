import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Action } from '@/common/enums';

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
  @ApiProperty({ enum: Action, default: 'RESET_PASSWORD' })
  action: Action;

  @IsNotEmpty()
  @ApiProperty()
  expiresIn: number;
}
