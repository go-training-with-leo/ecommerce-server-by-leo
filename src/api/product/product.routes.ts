import { Role } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';

import {
  CreatedProductDto,
  UpdatedProductDto,
  GotProductDetailDto,
  AddedDiscountProductDto,
  AddedInventoryProductDto,
} from './dto';

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
    jwtSecure: false,
    swaggerInfo: {
      responses: [
        { status: HttpStatus.OK, type: GotProductDetailDto, isArray: true },
      ],
    },
  },
  getById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotProductDetailDto }],
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
  addDiscountById: <IRouteParams>{
    path: '/:id/discounts',
    method: RequestMethod.PUT,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: AddedDiscountProductDto }],
    },
  },
  addInventoryById: <IRouteParams>{
    path: '/:id/inventories',
    method: RequestMethod.PUT,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: AddedInventoryProductDto }],
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
