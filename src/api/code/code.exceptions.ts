import { BadRequestException } from '@nestjs/common';

export class WrongCodeInformationException extends BadRequestException {
  constructor() {
    super('Wrong code information provided.');
  }
}
