import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';

export class UpdatedCategoryDto extends ActionedBaseDto {
  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  name: string;
}
