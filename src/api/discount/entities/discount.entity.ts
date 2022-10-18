import { Column, Entity, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';

import { Product } from '@/api/product/entities';
import discountRoutes from '@/api/discount/discount.routes';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: discountRoutes.index })
export class Discount extends BaseEntity {
  @Column()
  name: string;

  @Column()
  percent: number;

  @Column()
  status: boolean;

  @OneToMany(() => Product, (product) => product.discount, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: Product[];

  private parseDataBeforeAction(): void {
    const plainPercent = this.percent;

    this.percent = Number(plainPercent);
  }

  @BeforeInsert()
  private async setInsertingData(): Promise<void> {
    this.parseDataBeforeAction();
  }

  @BeforeUpdate()
  private async setUpdatingData(): Promise<void> {
    this.parseDataBeforeAction();
  }
}
