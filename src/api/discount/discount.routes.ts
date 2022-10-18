import { HttpStatus, RequestMethod } from '@nestjs/common';

import { Role } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import {
  GotDiscountDto,
  CreatedDiscountDto,
  UpdatedDiscountDto,
  GotDiscountDetailDto,
} from './dto';

export default {
  index: 'discounts',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: CreatedDiscountDto }],
    },
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [
        { status: HttpStatus.OK, type: GotDiscountDto, isArray: true },
      ],
    },
  },
  getById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotDiscountDetailDto }],
    },
  },
  updateById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdatedDiscountDto }],
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
