import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsUUID,
} from 'class-validator';

export class UpdateInvoiceDto {
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({ format: 'email' })
  email: string;

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

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({ format: 'uuid' })
  discountCode?: string;
}
