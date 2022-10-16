import { HttpStatus, RequestMethod } from '@nestjs/common';

import { Role } from '@/common/enums';
import { IRouteParams } from '@/decorators';

import { CreatedAddressDto, GotAddressDetailDto, GotAddressDto } from './dto';
import { UpdatedAddressDto } from './dto/updated-address.dto.';

export default {
  index: 'addresses',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.OK,
          type: CreatedAddressDto,
        },
      ],
    },
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [
        { status: HttpStatus.OK, type: GotAddressDto, isArray: true },
      ],
    },
  },
  getById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    roles: [Role.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotAddressDetailDto }],
    },
  },
  updateById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdatedAddressDto }],
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
