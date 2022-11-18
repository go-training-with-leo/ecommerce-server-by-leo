import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetailInvoiceItem } from './entities';
import { DetailInvoiceItemService } from './detail-invoice-item.service';
import { DetailInvoiceItemController } from './detail-invoice-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DetailInvoiceItem])],
  controllers: [DetailInvoiceItemController],
  providers: [DetailInvoiceItemService],
  exports: [DetailInvoiceItemService],
})
export class DetailInvoiceItemModule {}
