import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';
import { Product } from '@/api/product/entities';
import { GotProductDto } from '@/api/product/dto';

export class GotCategoryDto extends ActionedBaseDto {
  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  name: string;
}

export class GotCategoryDetailDto extends GotCategoryDto {
  @ApiProperty({ enum: () => Product })
  products: GotProductDto[];
}
