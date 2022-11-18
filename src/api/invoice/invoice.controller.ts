import { Body, Param } from '@nestjs/common';

import { InjectController, InjectRoute, ReqUser } from '@/decorators';

import type { User } from '@/api/user/entities/user.entity';

import {
  GotInvoiceDto,
  UpdateInvoiceDto,
  CreateInvoiceDto,
  UpdatedInvoiceDto,
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
    const gotInvoicees = await this.invoiceService.getAll(user);

    return gotInvoicees;
  }

  @InjectRoute(invoiceRoutes.getById)
  public async getById(
    @ReqUser() user: User,
    @Param('id') id: string,
  ): Promise<GotInvoiceDetailDto> {
    const gotInvoice = await this.invoiceService.getById({ user, id });

    return gotInvoice;
  }

  @InjectRoute(invoiceRoutes.updateById)
  public async updateById(
    @ReqUser() user: User,
    @Param('id') id: string,
    @Body() updateInfo: UpdateInvoiceDto,
  ): Promise<UpdatedInvoiceDto> {
    const updatedInvoice = await this.invoiceService.updateById({
      id,
      user,
      updateInfo,
    });

    return updatedInvoice;
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
