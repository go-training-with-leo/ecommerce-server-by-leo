import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import type { User } from '@/api/user/entities';

export class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accessToken: string;

  @IsNotEmpty()
  @ApiProperty()
  createdBy: User;
}
