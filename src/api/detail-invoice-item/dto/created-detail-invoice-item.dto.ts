import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, IsUUID } from 'class-validator';

import { GotInvoiceDto } from '@/api/invoice/dto';
import { GotInventoryDetailDto } from '@/api/inventory/dto';
import { ActionedBaseDto } from '@/common/dto';

export class CreatedDetailInvoiceItemDto extends ActionedBaseDto {
  @IsString()
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
  @ApiProperty()
  total: number;

  @IsUUID()
  @ApiProperty({ type: () => GotInventoryDetailDto })
  inventory: GotInventoryDetailDto;

  @IsUUID()
  @ApiProperty({ type: () => GotInvoiceDto })
  invoice: GotInvoiceDto;
}
