import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/common/decorators';

import { LogInDto } from './dto/login.dto';

export default {
  index: 'auth',
  register: <IRouteParams>{
    jwtSecure: false,
    path: '/register',
    code: HttpStatus.CREATED,
    method: RequestMethod.POST,
  },
  login: <IRouteParams>{
    path: '/login',
    jwtSecure: false,
    localSecure: true,
    method: RequestMethod.POST,
    swaggerInfo: {
      body: {
        type: LogInDto,
      },
    },
  },
};
