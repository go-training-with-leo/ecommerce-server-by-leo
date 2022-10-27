import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatedCategoryDto {
  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  name: string;
}
