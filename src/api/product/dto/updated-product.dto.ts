import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';

export class UpdatedProductDto extends ActionedBaseDto {
  @IsString()
  @ApiProperty({ example: 'Lorem' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Lorem' })
  description: string;

  @IsString()
  @ApiProperty({ example: 'Lorem' })
  details: string;

  @IsString()
  @ApiProperty({ example: 100 })
  price: number;
}
