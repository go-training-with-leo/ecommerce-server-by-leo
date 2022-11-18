import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPostalCode, IsPhoneNumber } from 'class-validator';

import { ActionedBaseDto } from '@/common/dto';

import { GotUserDto } from '@/api/user/dto';
import { User } from '@/api/user/entities';

export class GotAddressDto extends ActionedBaseDto {
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
}

export class GotAddressDetailDto extends GotAddressDto {
  @ApiProperty({ type: () =>  GotUserDto })
  createdBy: GotUserDto;
}
