import {
  IsEmail,
  IsString,
  IsPostalCode,
  IsPhoneNumber,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ActionedBaseDto } from '@/common/dto';

export class CreatedInvoiceDto extends ActionedBaseDto {
  @IsEmail()
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  lastName: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  street: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  city: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem',
  })
  country: string;

  @IsPostalCode()
  @ApiProperty({ example: '70000' })
  postalCode: string;

  @IsPhoneNumber('VN')
  @ApiProperty({
    example: '0123456789',
  })
  phoneNumber: string;

  @IsUUID()
  @ApiProperty({ format: 'uuid' })
  discountCode?: string;
}
