import { HttpStatus, RequestMethod } from '@nestjs/common';

import { Role } from '@/common/enums';
import { IRouteParams } from '@/decorators';

import {
  GotInventoryDto,
  CreatedInventoryDto,
  GotInventoryDetailDto,
} from './dto';
import { UpdatedInventoryDto } from './dto/updated-inventory.dto.';

export default {
  index: 'inventories',
  create: <IRouteParams>{
    path: '/products/:productId',
    method: RequestMethod.POST,
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.OK,
          type: CreatedInventoryDto,
        },
      ],
    },
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [
        { status: HttpStatus.OK, type: GotInventoryDto, isArray: true },
      ],
    },
  },
  getById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotInventoryDetailDto }],
    },
  },
  updateById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdatedInventoryDto }],
    },
  },
  deleteById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
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
