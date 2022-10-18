import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { Base as BaseEntity } from '@/common/entities';
import productRoutes from '@/api/product/product.routes';
import { Discount } from '@/api/discount/entities';
import { Exclude } from 'class-transformer';

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
}
