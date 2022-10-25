import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Size } from '@/common/enums';
import { entity, enumh } from '@/utils/helpers';
import { Product } from '@/api/product/entities';
import { Base as BaseEntity } from '@/common/entities';
import inventoryRoutes from '@/api/inventory/inventory.routes';
import { omit } from 'ramda';

@Entity({ name: inventoryRoutes.index })
export class Inventory extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Size,
    default: Size[enumh?.getFirstValue<typeof Size>(Size)],
  })
  size: Size;

  @Column()
  quantity: number;

  @Column()
  color: string;

  @ManyToOne(() => Product, (product) => product.inventories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  private parseDataBeforeAction(): void {
    if (entity.isValidFieldBeforeParse({ data: Size, value: this.size })) {
      const plainSize =
        this.size || Size[enumh.getFirstValue<typeof Size>(Size)];

      this.size = Number(Size?.[plainSize]);
    }
  }

  @BeforeInsert()
  private async setInsertingData(): Promise<void> {
    this.parseDataBeforeAction();
  }

  @BeforeUpdate()
  private async setUpdatingData(): Promise<void> {
    this.parseDataBeforeAction();
  }

  public toResponse(): Omit<this, 'setInsertingData' | 'setUpdatingData'> {
    return {
      ...omit(['setInsertingData', 'setUpdatingData'], this),
      size: Size[this.size],
    };
  }
}
