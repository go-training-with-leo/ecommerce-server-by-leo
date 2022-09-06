import { Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

import type { INestApplication } from '@nestjs/common';

export const loadErrorHandling = (app: INestApplication): void => {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(new ValidationPipe());
};
