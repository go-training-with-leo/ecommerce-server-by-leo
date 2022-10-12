import { Role } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';

import { GotProductDto, CreatedProductDto, UpdatedProductDto } from './dto';

export default {
  index: 'products',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: CreatedProductDto }],
    },
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [
        { status: HttpStatus.OK, type: GotProductDto, isArray: true },
      ],
    },
  },
  getById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotProductDto }],
    },
  },
  updateById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdatedProductDto }],
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