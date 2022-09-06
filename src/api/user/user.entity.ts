import { Exclude } from 'class-transformer';

import { Column, Entity, BeforeInsert } from 'typeorm';

import { hash } from '@/utils/helpers';
import { Gender } from '@/common/enums';

import { Base as BaseEntity } from '@/common/entities';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'date', nullable: true })
  bod: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;

  @BeforeInsert()
  async setPassword() {
    const saltRounds = 10;

    this.password = await hash.generateWithBcrypt({
      source: this.password,
      salt: saltRounds,
    });
  }
}
