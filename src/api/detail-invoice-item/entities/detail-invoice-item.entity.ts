import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Invoice } from '@/api/invoice/entities';
import { Inventory } from '@/api/inventory/entities';
import { Base as BaseEntity } from '@/common/entities';
import detailInvoiceItemRoutes from '@/api/detail-invoice-item/detail-invoice-item.routes';

@Entity({ name: detailInvoiceItemRoutes.index })
export class DetailInvoiceItem extends BaseEntity {
  @Column()
  amount: number;

  @Column()
  discount: number;

  @Column()
  total: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.detailInvoiceItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'inventory_id' })
  inventory: Inventory;

  @ManyToOne(() => Invoice, (invoice) => invoice.detailInvoiceItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'invoice_id' })
  invoice: DetailInvoiceItem;
}
