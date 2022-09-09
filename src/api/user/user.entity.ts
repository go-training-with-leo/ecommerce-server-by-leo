import { omit } from 'ramda';
import { Exclude } from 'class-transformer';

import { Column, Entity, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';

import { Gender, Role } from '@/common/enums';
import { getKeyByValueInObject, hash } from '@/utils/helpers';

import { Token } from '@/api/token/token.entity';
import { Base as BaseEntity } from '@/common/entities';

@Entity()
export class User extends BaseEntity {
  @Column({ enum: Role })
  role?: Role;

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
  bod?: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;

  private isValidFieldBeforeBeforeParse({
    data,
    value,
  }: {
    data: Record<string, string | number>;
    value: string | number;
  }): boolean {
    return Object.keys(data)
      .filter((elm) => isNaN(Number(elm)))
      .includes(value?.toString());
  }

  private parseDataBeforeAction() {
    const plainRole = this.role ?? 'USER';

    if (this.isValidFieldBeforeBeforeParse({ data: Role, value: plainRole })) {
      this.role = Number(Role?.[plainRole]);
    }

    if (
      this.isValidFieldBeforeBeforeParse({ data: Gender, value: this.gender })
    ) {
      this.gender = Number(Gender?.[this.gender]);
    }
  }

  @BeforeInsert()
  private async formatInsertedData() {
    const saltRounds = 10;

    this.password = await hash.generateWithBcrypt({
      source: this.password,
      salt: saltRounds,
    });

    this.parseDataBeforeAction();
  }

  @BeforeUpdate()
  private async formatUpdatedData() {
    this.parseDataBeforeAction();
  }

  @OneToMany(() => Token, (token) => token.createdBy, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sessions: Token[];

  public toResponse(): Omit<this, 'password' | 'formatData'> & {
    role: string;
    gender: string;
  } {
    return {
      ...omit(['password', 'formatData'], this),
      role: getKeyByValueInObject({ data: Role, value: this.role }),
      gender:
        getKeyByValueInObject({
          data: Gender,
          value: this.gender,
        }) || null,
    };
  }
}
