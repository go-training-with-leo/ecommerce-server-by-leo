import { ApiProperty } from '@nestjs/swagger';
import { Min, Max, IsInt, IsString, IsBoolean } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';

export class UpdatedDiscountDto extends ActionedBaseDto {
  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  name: string;

  @IsInt()
  @Min(1)
  @Max(99)
  @ApiProperty({
    example: 20,
    maximum: 99,
    minimum: 1,
  })
  percent: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  status: boolean;
}
