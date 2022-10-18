import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddDiscountProductDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  discountId: string;
}
