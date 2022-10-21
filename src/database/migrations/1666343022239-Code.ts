import { Table, QueryRunner, MigrationInterface } from 'typeorm';

import { enumh } from '@/utils/helpers';
import { CodeAction, CodeStatus } from '@/common/enums';

export class Code1666343022239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'codes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'code',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'action',
            type: 'enum',
            enum: enumh.getValuesAndToString<typeof CodeAction>(CodeAction),
            enumName: 'codes_action_type_enum',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: enumh.getValuesAndToString<typeof CodeStatus>(CodeStatus),
            enumName: 'codes_status_type_enum',
            isNullable: true,
          },
          { name: 'expires_in', type: 'int4' },
          {
            name: 'created_at',
            type: 'timestamp',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: `('now'::text)::timestamp(6) with time zone`,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('codes');
  }
}
