import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

import { Size } from '@/common/enums';
import { enumh } from '@/utils/helpers';
import { IsValidSize } from '@/decorators';
import { ActionedBaseDto } from '@/common/dto';

export class UpdatedInventoryDto extends ActionedBaseDto {
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
  @ApiProperty()
  color: string;
}
