import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { Size } from '@/common/enums';
import { Discount } from '@/api/discount/entities';
import { Inventory } from '@/api/inventory/entities';
import { Base as BaseEntity } from '@/common/entities';
import productRoutes from '@/api/product/product.routes';

@Entity({ name: productRoutes.index })
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  detail: string;

  @Column({ name: 'garment_care' })
  garmentCare: string;

  @Column({ type: 'int4' })
  price: number;

  @ManyToOne(() => Discount, (discount) => discount.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'discount_id' })
  discount?: Discount;

  @Exclude()
  @Column({ name: 'discount_id', nullable: true })
  discountId?: number;

  @OneToMany(() => Inventory, (inventory) => inventory.product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  inventories: Inventory[];

  public toResponse(): Omit<this, 'setInsertingData' | 'setUpdatingData'> {
    return {
      ...this,
      inventories: this?.inventories?.map((inventory) => ({
        ...inventory,
        size: Size[inventory.size],
      })),
    };
  }
}
