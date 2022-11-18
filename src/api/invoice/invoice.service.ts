import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import type { User } from '@/api/user/entities';
import { isAdmin } from '@/utils/helpers';
import { DetailInvoiceItemService } from '@/api/detail-invoice-item/detail-invoice-item.service';

import { Invoice } from './entities';

import type {
  GotInvoiceDto,
  CreateInvoiceDto,
  UpdateInvoiceDto,
  CreatedInvoiceDto,
  UpdatedInvoiceDto,
  GotInvoiceDetailDto,
} from './dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,

    private detailInvoiceItemService: DetailInvoiceItemService,
  ) {}

  public async create(
    user: User,
    invoiceInfo: CreateInvoiceDto,
  ): Promise<CreatedInvoiceDto | null> {
    const createdInvoice = this.invoiceRepository.create({
      ...invoiceInfo,
      createdBy: user,
    });

    await this.invoiceRepository.save(createdInvoice);

    for (const detailItem of invoiceInfo?.detailItems) {
      await this.detailInvoiceItemService.create({
        ...detailItem,
        invoice: createdInvoice,
      });
    }

    return createdInvoice;
  }

  public async getAll(user: User): Promise<GotInvoiceDto[]> {
    let condition = {};

    if (!isAdmin(user)) {
      condition = { createdBy: { id: user?.id } };
    }

    const invoices = await this.invoiceRepository.find({
      where: condition,
      relations: {
        detailInvoiceItems: {
          inventory: {
            product: true,
          },
        },
      },
    });

    return invoices;
  }

  public async getById({
    id,
    user,
  }: {
    id: string;
    user: User;
  }): Promise<GotInvoiceDetailDto> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: { createdBy: true },
    });

    if (!invoice) {
      throw new NotFoundException();
    }

    if (invoice?.createdBy?.id !== user?.id && !isAdmin(user)) {
      throw new ForbiddenException();
    }

    return invoice;
  }

  public async updateById({
    id,
    user,
    updateInfo,
  }: {
    id: string;
    user: User;
    updateInfo: UpdateInvoiceDto;
  }): Promise<UpdatedInvoiceDto> {
    const invoice = await this.getById({ user, id });

    const updatedInvoice = await this.invoiceRepository.create({
      ...invoice,
      ...updateInfo,
    });

    await this.invoiceRepository.save(updatedInvoice);

    return updatedInvoice;
  }

  public async deleteById({
    id,
    user,
  }: {
    user: User;
    id: string;
  }): Promise<DeleteResult> {
    await this.getById({ user, id });

    return this.invoiceRepository.delete({ id });
  }
}
