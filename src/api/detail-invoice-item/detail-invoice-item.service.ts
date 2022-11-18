import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DetailInvoiceItem } from './entities';

import type { CreateDetailInvoiceItemDto } from './dto/created-detail-invoice-item.dto';

@Injectable()
export class DetailInvoiceItemService {
  constructor(
    @InjectRepository(DetailInvoiceItem)
    private detailInvoiceItemRepository: Repository<DetailInvoiceItem>,
  ) {}

  public async create(
    detailInvoiceItemInfo: CreateDetailInvoiceItemDto,
  ): Promise<DetailInvoiceItem> {
    const createdDetailInvoiceItem = this.detailInvoiceItemRepository.create(
      detailInvoiceItemInfo,
    );

    await this.detailInvoiceItemRepository.save(createdDetailInvoiceItem);

    return createdDetailInvoiceItem;
  }
}
