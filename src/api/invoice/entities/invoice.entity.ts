import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '@/api/user/entities';
import { Base as BaseEntity } from '@/common/entities';
import invoiceRoutes from '@/api/invoice/invoice.routes';
import { DetailInvoiceItem } from '@/api/detail-invoice-item/entities';

@Entity({ name: invoiceRoutes.index })
export class Invoice extends BaseEntity {
  @Column()
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'discount_code', nullable: true })
  discountCode: string;

  @Column()
  total: number;

  @Exclude()
  @ManyToOne(() => User, (user) => user.invoices, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  createdBy: User;

  // @OneToMany(
  //   () => DetailInvoiceItem,
  //   (detailItemInvoice) => detailItemInvoice.invoice,
  //   {
  //     onDelete: 'CASCADE',
  //     onUpdate: 'CASCADE',
  //   },
  // )
  // detailInvoiceItems: DetailInvoiceItem[];
}
