import { ApiPropertyOptional } from '@nestjs/swagger';
import { Min, IsString, IsOptional, IsInt, IsUUID } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  detail?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  garmentCare?: string;

  @Min(1)
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  price?: number;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ format: 'uuid' })
  category: string;
}
