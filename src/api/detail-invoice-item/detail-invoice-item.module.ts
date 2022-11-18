import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetailInvoiceItem } from './entities';
import { InventoryModule } from '@/api/inventory/inventory.module';
import { DetailInvoiceItemService } from './detail-invoice-item.service';
import { DetailInvoiceItemController } from './detail-invoice-item.controller';

@Module({
  imports: [InventoryModule, TypeOrmModule.forFeature([DetailInvoiceItem])],
  controllers: [DetailInvoiceItemController],
  providers: [DetailInvoiceItemService],
  exports: [DetailInvoiceItemService],
})
export class DetailInvoiceItemModule {}
