import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DetailInvoiceItem } from './entities';

import { InventoryService } from '@/api/inventory/inventory.service';

@Injectable()
export class DetailInvoiceItemService {
  constructor(
    @InjectRepository(DetailInvoiceItem)
    private detailInvoiceItemRepository: Repository<DetailInvoiceItem>,

    private inventoryService: InventoryService,
  ) {}

  public async create(detailInvoiceItemInfo: any): Promise<any> {
    const inventory = await this.inventoryService.getById(
      detailInvoiceItemInfo?.inventory,
    );

    const createdDetailInvoiceItem = this.detailInvoiceItemRepository.create({
      ...detailInvoiceItemInfo,
      inventory,
    });

    await this.detailInvoiceItemRepository.save(createdDetailInvoiceItem);

    return createdDetailInvoiceItem;
  }
}
