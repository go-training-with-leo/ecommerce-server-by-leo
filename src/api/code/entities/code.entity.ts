import { omit } from 'ramda';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

import { entity, enumh } from '@/utils/helpers';
import codeRoutes from '@/api/code/code.routes';
import { CodeAction, CodeStatus } from '@/common/enums';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: codeRoutes.index })
export class Code extends BaseEntity {
  @Exclude()
  @Column({ unique: true })
  code: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: CodeAction,
    default: CodeAction[enumh?.getFirstValue<typeof CodeAction>(CodeAction)],
  })
  action: CodeAction;

  @Column({ name: 'expires_in' })
  expiresIn: number;

  @Column({
    type: 'enum',
    enum: CodeStatus,
    default: CodeStatus[enumh?.getFirstValue<typeof CodeStatus>(CodeStatus)],
  })
  status: CodeStatus;

  private parseDataBeforeAction(): void {
    if (
      entity.isValidFieldBeforeParse({
        data: CodeAction,
        value: this.action,
      })
    ) {
      const plainAction = this.action ?? CodeAction[CodeAction.RESET_PASSWORD];

      this.action = Number(CodeAction[plainAction]);
    }

    if (
      entity.isValidFieldBeforeParse({
        data: CodeStatus,
        value: this.status,
      })
    ) {
      const plainStatus = this.status ?? CodeStatus[CodeStatus.IS_CREATED];

      this.status = Number(CodeStatus?.[plainStatus]);
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async formatInsertedOrUpdatedData(): Promise<void> {
    this.parseDataBeforeAction();
  }

  public toResponse(): Omit<this, 'formatInsertedOrUpdatedData'> {
    return {
      ...omit(['formatInsertedOrUpdatedData'], this),
      action: CodeAction[this.action],
      status: CodeStatus[this.status],
    };
  }
}
