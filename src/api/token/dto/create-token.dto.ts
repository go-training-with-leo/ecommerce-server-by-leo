import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

import { GotUserDto } from '@/api/user/dto';

export class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOjAsImlhdCI6MTY2MjYzMTkzOCwiZXhwIjoxNjY1MjIzOTM4fQ.d806NRcVKaBY1cAXjiMuJvLMg0DxTYdDkd269ETKnNU',
  })
  accessToken: string;

  @IsNotEmpty()
  @ApiProperty({ type: () => GotUserDto })
  createdBy: GotUserDto;
}
