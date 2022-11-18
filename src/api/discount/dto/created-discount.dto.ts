import { ApiProperty } from '@nestjs/swagger';
import { Min, Max, IsString, IsBoolean, IsInt } from 'class-validator';

export class CreatedDiscountDto {
  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  name: string;

  @IsInt()
  @Min(1)
  @Max(99)
  @ApiProperty({
    minimum: 1,
    maximum: 99,
    example: 20,
    type: () => 'number',
  })
  percent: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  status: boolean;
}
