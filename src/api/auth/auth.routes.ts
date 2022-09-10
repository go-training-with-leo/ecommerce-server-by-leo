import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

import { LogInDto, LoggedInDto, RegisteredDto } from './dto';

export default {
  index: 'auth',
  register: <IRouteParams>{
    jwtSecure: false,
    path: '/register',
    code: HttpStatus.CREATED,
    method: RequestMethod.POST,
    swaggerInfo: {
      responses: [{ status: HttpStatus.CREATED, type: RegisteredDto }],
    },
  },
  login: <IRouteParams>{
    path: '/login',
    jwtSecure: false,
    localSecure: true,
    code: HttpStatus.OK,
    method: RequestMethod.POST,
    swaggerInfo: {
      body: {
        type: LogInDto,
      },
      responses: [{ status: HttpStatus.OK, type: LoggedInDto }],
    },
  },
  forgetPassword: <IRouteParams>{
    path: '/forget-password',
    jwtSecure: false,
    code: HttpStatus.OK,
    method: RequestMethod.POST,
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.ACCEPTED,
          schema: {
            type: 'string',
            example: 'user@gmail.com',
          },
        },
      ],
    },
  },
  verifyPasswordResetCode: <IRouteParams>{
    path: '/verify-password-reset-code',
    jwtSecure: false,
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.ACCEPTED,
          schema: {
            type: 'string',
            example: 'user@gmail.com',
          },
        },
      ],
    },
  },
  resetPassword: <IRouteParams>{
    path: '/reset-password',
    jwtSecure: false,
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.OK,
          schema: {
            type: 'string',
            example: 'user@gmail.com',
          },
        },
      ],
    },
  },
};
