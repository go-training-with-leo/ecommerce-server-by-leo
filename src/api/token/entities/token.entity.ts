import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { User } from '@/api/user/entities';
import tokenRoutes from '@/api/token/token.routes';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: tokenRoutes.index })
export class Token extends BaseEntity {
  @Exclude()
  @Column({ name: 'access_token' })
  accessToken: string;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  createdBy: User;
}
