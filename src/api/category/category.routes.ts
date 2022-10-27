import { HttpStatus, RequestMethod } from '@nestjs/common';

import { Role } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import {
  GotCategoryDto,
  CreatedCategoryDto,
  UpdatedCategoryDto,
  GotCategoryDetailDto,
} from './dto';

export default {
  index: 'categories',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: CreatedCategoryDto }],
    },
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [
        { status: HttpStatus.OK, type: GotCategoryDto, isArray: true },
      ],
    },
  },
  getById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotCategoryDetailDto }],
    },
  },
  updateById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdatedCategoryDto }],
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
