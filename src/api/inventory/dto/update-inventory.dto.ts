import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

import { Size } from '@/common/enums';
import { enumh } from '@/utils/helpers';
import { IsValidSize } from '@/decorators';

export class UpdateInventoryDto {
  @IsOptional()
  @IsValidSize()
  @ApiPropertyOptional({
    enum: Size,
    default: Size[enumh?.getFirstValue<typeof Size>(Size)],
  })
  size?: Size;

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  color?: string;
}
