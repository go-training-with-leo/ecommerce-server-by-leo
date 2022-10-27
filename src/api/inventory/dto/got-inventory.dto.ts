import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';

import { Size } from '@/common/enums';
import { enumh } from '@/utils/helpers';
import { User } from '@/api/user/entities';
import { IsValidSize } from '@/decorators';
import { GotProductDto } from '@/api/product/dto';

export class GotInventoryDto extends ActionedBaseDto {
  @IsValidSize()
  @ApiProperty({
    enum: Size,
    default: Size[enumh?.getFirstValue<typeof Size>(Size)],
  })
  size: Size;

  @IsInt()
  @Min(0)
  @ApiProperty()
  quantity: number;

  @IsString()
  @ApiProperty({ example: '#000000' })
  color: string;
}

export class GotInventoryDetailDto extends GotInventoryDto {
  @ApiProperty({ type: () => GotProductDto })
  product: GotProductDto;
}
