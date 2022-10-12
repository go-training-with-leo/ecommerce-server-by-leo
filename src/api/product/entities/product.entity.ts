import { Column, Entity } from 'typeorm';

import { Base as BaseEntity } from '@/common/entities';
import productRoutes from '@/api/product/product.routes';

@Entity({ name: productRoutes.index })
export class Product extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  details: string;

  @Column()
  price: number;
}
