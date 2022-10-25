import { HttpStatus, RequestMethod } from '@nestjs/common';

import { Role } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { CreatedCodeDto, GotCodeDto, UpdatedCodeDto } from './dto';

export default {
  index: 'codes',
  create: <IRouteParams>{
    path: '/',
    roles: [Role.ADMIN],
    method: RequestMethod.POST,
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.OK,
          type: CreatedCodeDto,
        },
      ],
    },
  },
  getAll: <IRouteParams>{
    path: '/',
    roles: [Role.ADMIN],
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotCodeDto, isArray: true }],
    },
  },
  updateById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdatedCodeDto }],
    },
  },
  deleteById: <IRouteParams>{
    path: '/:id',
    roles: [Role.ADMIN],
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
