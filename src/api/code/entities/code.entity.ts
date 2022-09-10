import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

import { entity } from '@/utils/helpers';
import { Action, CodeStatus } from '@/common/enums';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'codes' })
export class Code extends BaseEntity {
  @Exclude()
  @Column({ unique: true })
  code: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Action, default: Action.RESET_PASSWORD })
  action: Action;

  @Column({ name: 'expires_in' })
  expiresIn: number;

  @Column({ type: 'enum', enum: CodeStatus, default: CodeStatus.IS_CREATED })
  status: CodeStatus;

  private parseDataBeforeAction(): void {
    const plainStatus = this.status ?? 'IS_CREATED';
    const plainAction = this.action ?? 'RESET_PASSWORD';

    if (
      entity.isValidFieldBeforeParse({
        data: Action,
        value: plainAction,
      })
    ) {
      this.action = Number(Action?.[plainAction]);
    }

    if (
      entity.isValidFieldBeforeParse({
        data: CodeStatus,
        value: plainStatus,
      })
    ) {
      this.status = Number(CodeStatus?.[plainStatus]);
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async formatInsertedOrUpdatedData(): Promise<void> {
    this.parseDataBeforeAction();
  }
}
