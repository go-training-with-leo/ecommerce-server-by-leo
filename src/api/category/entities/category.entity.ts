import { Column, Entity, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';

import { Product } from '@/api/product/entities';
import categoryRoutes from '@/api/category/category.routes';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: categoryRoutes.index })
export class Category extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: Product[];
}
