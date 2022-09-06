import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'tokens' })
export class Token extends BaseEntity {
  @Exclude()
  @Column({ name: 'user_id' })
  userId: string;

  @Exclude()
  @Column({ name: 'access_token' })
  accessToken: string;
}
