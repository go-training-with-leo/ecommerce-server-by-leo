import { BadRequestException } from '@nestjs/common';

export class UserAlreadyException extends BadRequestException {
  constructor() {
    super('User with that email or phone number already exists.');
  }
}

export class WrongCredentialsException extends BadRequestException {
  constructor() {
    super('Wrong credentials provided.');
  }
}

export class InvalidPasswordResetCodeException extends BadRequestException {
  constructor() {
    super('Invalid password reset code.');
  }
}

export class NotMatchPasswordResetException extends BadRequestException {
  constructor() {
    super('New Password and Confirm Password do not match together.');
  }
}
