import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiConsumes,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import type { ApiBodyOptions } from '@nestjs/swagger';

export function SwaggerController(name: string) {
  return applyDecorators(ApiTags(name));
}

export function SwaggerApi({
  secure = false,
  swaggerInfo = {},
}: {
  secure: boolean;
  swaggerInfo?: { body?: ApiBodyOptions };
}) {
  const consumeTypes = [
    'application/json',
    'application/x-www-form-urlencoded',
  ];

  const decorators = [];

  decorators.push(consumeTypes.map((consumeType) => ApiConsumes(consumeType)));

  if (secure) {
    decorators.push([
      ApiBearerAuth(),
      ApiResponse({ status: 401, description: 'You are unauthorized.' }),
      ApiResponse({
        status: 403,
        description: 'You are unauthorized to use this resource.',
      }),
      ApiResponse({
        status: 404,
        description: 'The resource can not be found.',
      }),
    ]);
  }

  if (Object?.values(swaggerInfo?.body || {})?.length > 0) {
    decorators.push(ApiBody(swaggerInfo?.body));
  }

  return applyDecorators(...decorators.flat());
}
