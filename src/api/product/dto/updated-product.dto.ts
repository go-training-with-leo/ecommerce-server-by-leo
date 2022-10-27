import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';
import { GotCategoryDto } from '@/api/category/dto';

export class UpdatedProductDto extends ActionedBaseDto {
  @IsString()
  @ApiProperty({ example: 'Lorem' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Lorem' })
  description: string;

  @IsString()
  @ApiProperty({ example: 'Lorem' })
  detail: string;

  @IsString()
  @ApiProperty({ example: 'Lorem' })
  garmentCare: string;

  @Min(1)
  @IsInt()
  @ApiProperty({ example: 100 })
  price: number;

  @ApiProperty({ type: () => GotCategoryDto })
  category: GotCategoryDto;
}
