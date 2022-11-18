import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import type { User } from '@/api/user/entities/user.entity';

import {
  GotInvoiceDto,
  CreateInvoiceDto,
  CreatedInvoiceDto,
  GotInvoiceDetailDto,
} from './dto';
import invoiceRoutes from './invoice.routes';
import { InvoiceService } from './invoice.service';

@InjectController({ name: invoiceRoutes.index })
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @InjectRoute(invoiceRoutes.create)
  public async create(
    @ReqUser() user: User,
    @Body() invoiceInfo: CreateInvoiceDto,
  ): Promise<CreatedInvoiceDto> {
    const createdInvoice = await this.invoiceService.create(user, invoiceInfo);

    return createdInvoice;
  }

  @InjectRoute(invoiceRoutes.getAll)
  public async getAll(@ReqUser() user: User): Promise<GotInvoiceDto[]> {
    const gotInvoices = await this.invoiceService.getAll(user);

    return gotInvoices;
  }

  @InjectRoute(invoiceRoutes.getById)
  public async getById(
    @ReqUser() user: User,
    @Param('id') id: string,
  ): Promise<GotInvoiceDetailDto> {
    const gotInvoice = await this.invoiceService.getById({ user, id });

    return gotInvoice;
  }

  @InjectRoute(invoiceRoutes.deleteById)
  public async deleteById(
    @ReqUser() user: User,
    @Param('id') id: string,
  ): Promise<string> {
    await this.invoiceService.deleteById({ id, user });

    return id;
  }
}
