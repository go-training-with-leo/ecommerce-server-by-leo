import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

import { Size } from '@/common/enums';
import { enumh } from '@/utils/helpers';
import { IsValidSize } from '@/decorators';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsValidSize()
  @ApiProperty({
    enum: Size,
    default: Size[enumh?.getFirstValue<typeof Size>(Size)],
  })
  size: Size;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '#000000' })
  color: string;
}
