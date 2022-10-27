import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';
import { GotCategoryDto } from '@/api/category/dto';
import { Category } from '@/api/category/entities';

export class CreatedProductDto extends ActionedBaseDto {
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
  @ApiProperty({
    example: 'Lorem',
  })
  garmentCare: string;

  @Min(1)
  @IsNumber()
  @ApiProperty({ example: 100, minimum: 1 })
  price: number;

  @ApiProperty({ enum: () => Category })
  category: GotCategoryDto;
}
