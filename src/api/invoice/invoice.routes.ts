import { HttpStatus, RequestMethod } from '@nestjs/common';

import { IRouteParams } from '@/decorators';

import { CreatedInvoiceDto, GotInvoiceDetailDto, GotInvoiceDto } from './dto';

export default {
  index: 'invoices',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.OK,
          type: CreatedInvoiceDto,
        },
      ],
    },
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [
        { status: HttpStatus.OK, type: GotInvoiceDto, isArray: true },
      ],
    },
  },
  getById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: GotInvoiceDetailDto }],
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
