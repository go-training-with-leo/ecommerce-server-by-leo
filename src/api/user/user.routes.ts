import { Role } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';
import {
  GotUserDto,
  CreatedUserDto,
  UpdatedUserDto,
  GotUserDetailDto,
} from './dto';

export default {
  index: 'users',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    jwtSecure: false,
    // roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: CreatedUserDto }],
    },
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotUserDto, isArray: true }],
    },
  },
  getMe: <IRouteParams>{
    path: '/me',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotUserDetailDto }],
    },
  },
  updateMe: <IRouteParams>{
    path: '/me',
    method: RequestMethod.PUT,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdatedUserDto }],
    },
  },
  getById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotUserDetailDto }],
    },
  },
  updateById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdatedUserDto }],
    },
  },
  deleteById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.OK,
          schema: {
            type: 'string',
            example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc',
          },
        },
      ],
    },
  },
};
