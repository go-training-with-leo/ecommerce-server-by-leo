import {
  Table,
  TableColumn,
  QueryRunner,
  TableForeignKey,
  MigrationInterface,
} from 'typeorm';

import { Size } from '@/common/enums';
import { enumh } from '@/utils/helpers';

export class Inventory1666888936313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inventories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'size',
            type: 'enum',
            enum: enumh.getValuesAndToString<typeof Size>(Size),
            enumName: 'products_size_type_enum',
          },
          {
            name: 'quantity',
            type: 'int4',
          },
          {
            name: 'color',
            type: 'varchar',
          },
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

    await queryRunner.addColumn(
      'inventories',
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'inventories',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('inventories');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('product_id') !== -1,
    );
    await queryRunner.dropForeignKey('inventories', foreignKey);
    await queryRunner.dropColumn('inventories', 'product_id');
    await queryRunner.dropTable('inventories');

    await queryRunner.dropTable('inventories');
  }
}
