import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  country: string;

  @IsPostalCode('any')
  @IsNotEmpty()
  @ApiProperty({ example: '70000' })
  postalCode: string;

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  @ApiProperty({
    example: '0123456789',
  })
  phoneNumber: string;
}
