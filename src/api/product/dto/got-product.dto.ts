import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';
import { GotInventoryDto } from '@/api/inventory/dto';
import { GotDiscountDto } from '@/api/discount/dto';
import { Category } from '@/api/category/entities';
import { GotCategoryDto } from '@/api/category/dto';
import { Discount } from '@/api/discount/entities';
import { Inventory } from '@/api/inventory/entities';

export class GotProductDto extends ActionedBaseDto {
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
  @IsInt()
  @ApiProperty({ example: 100, minimum: 1 })
  price: number;
}

export class GotProductDetailDto extends GotProductDto {
  @ApiProperty({ enum: () => Discount })
  discount?: GotDiscountDto;

  @ApiProperty({ enum: () => Category })
  category: GotCategoryDto;

  @ApiProperty({ enum: () => Inventory, isArray: true })
  inventories?: GotInventoryDto[];
}
