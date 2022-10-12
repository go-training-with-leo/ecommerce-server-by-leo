import { omit } from 'ramda';
import { Exclude } from 'class-transformer';
import { Column, Entity, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';

import { Token } from '@/api/token/entities';
import { Gender, Role } from '@/common/enums';
import userRoutes from '@/api/user/user.routes';
import { entity, enumh, hash } from '@/utils/helpers';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: userRoutes.index })
export class User extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Role,
    default: enumh.getFirstValue<typeof Role>(Role),
  })
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

  private parseDataBeforeAction(): void {
    const plainRole = this.role ?? 'USER';

    if (entity.isValidFieldBeforeParse({ data: Role, value: plainRole })) {
      this.role = Number(Role?.[plainRole]);
    }

    if (entity.isValidFieldBeforeParse({ data: Gender, value: this.gender })) {
      this.gender = Number(Gender?.[this.gender]);
    }
  }

  @BeforeInsert()
  private async setInsertingData(): Promise<void> {
    const saltRounds = 10;

    this.password = await hash.generateWithBcrypt({
      source: this.password,
      salt: saltRounds,
    });

    this.parseDataBeforeAction();
  }

  @BeforeUpdate()
  private async setUpdatingData(): Promise<void> {
    this.parseDataBeforeAction();
  }

  @OneToMany(() => Token, (token) => token.createdBy, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sessions: Token[];

  public toResponse(): Omit<
    this,
    'password' | 'setInsertingData' | 'setUpdatingData'
  > & {
    role: string;
    gender: string;
  } {
    return {
      ...omit(['password', 'setInsertingData', 'setUpdatingData'], this),
      role: Role[this.role],
      gender: Gender[this.gender] || null,
    };
  }

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
