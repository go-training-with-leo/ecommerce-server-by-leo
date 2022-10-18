import {
  Min,
  Max,
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDiscountDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(99)
  @ApiPropertyOptional()
  percent?: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  status?: boolean;
}
