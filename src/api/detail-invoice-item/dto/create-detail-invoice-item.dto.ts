import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min, Max, IsUUID } from 'class-validator';

export class CreateDetailInvoiceItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsInt()
  @Min(0)
  @Max(99)
  @ApiProperty({
    example: 20,
    maximum: 99,
    minimum: 1,
  })
  discount: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  total: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  inventory: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid' })
  invoice: string;
}
