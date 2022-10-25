import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';
import { GotInventoryDto } from '@/api/inventory/dto';

export class AddedInventoryProductDto extends ActionedBaseDto {
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

  @ApiProperty({ isArray: true, type: () => GotInventoryDto })
  inventories?: GotInventoryDto[];
}
