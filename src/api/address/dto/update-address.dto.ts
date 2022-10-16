import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  street?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  city?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  country?: string;

  @IsOptional()
  @IsPostalCode('any')
  @ApiPropertyOptional()
  postalCode?: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  @ApiPropertyOptional()
  phoneNumber?: string;
}
