import {
  Min,
  Max,
  IsInt,
  IsString,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  name: string;

  @IsInt()
  @Min(1)
  @Max(99)
  @IsNotEmpty()
  @ApiProperty({
    example: 20,
    maximum: 99,
    minimum: 1,
  })
  percent: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
  })
  status: boolean;
}
