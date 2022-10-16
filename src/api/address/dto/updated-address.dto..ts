import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsPostalCode } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';

export class UpdatedAddressDto extends ActionedBaseDto {
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

  @IsPostalCode('any')
  @ApiProperty({ example: '70000' })
  postalCode: string;

  @IsPhoneNumber('VN')
  @ApiProperty({
    example: '0123456789',
  })
  phoneNumber: string;
}
