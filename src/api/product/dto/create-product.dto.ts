import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  garmentCare: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  detail: string;

  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 100,
    minimum: 1,
  })
  price: number;
}
