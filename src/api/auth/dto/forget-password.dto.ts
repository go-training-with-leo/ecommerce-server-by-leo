import { Action } from '@/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ForgetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
  })
  email: string;
}

export class VerifyPasswordResetCode extends ForgetPasswordDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    format: 'uuid',
  })
  code: string;
}

export class ResetPassword extends VerifyPasswordResetCode {
  @IsNotEmpty()
  @ApiProperty({ format: 'password' })
  newPassword: string;

  @IsNotEmpty()
  @ApiProperty({ format: 'password' })
  confirmPassword: string;
}
