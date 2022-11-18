import {
  Table,
  TableColumn,
  QueryRunner,
  TableForeignKey,
  MigrationInterface,
} from 'typeorm';

export class DetailInvoiceItem1668760259722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'detail_invoice_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'amount',
            type: 'int4',
          },
          {
            name: 'total',
            type: 'int4',
          },
          {
            name: 'discount',
            type: 'int4',
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
      'detail_invoice_items',
      new TableColumn({
        name: 'inventory_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'detail_invoice_items',
      new TableForeignKey({
        columnNames: ['inventory_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'inventories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.addColumn(
      'detail_invoice_items',
      new TableColumn({
        name: 'invoice_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'detail_invoice_items',
      new TableForeignKey({
        columnNames: ['invoice_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'invoices',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('detail_invoice_items');

    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('inventory_id') !== -1,
    );
    await queryRunner.dropForeignKey('detail_invoice_items', foreignKey1);
    await queryRunner.dropColumn('detail_invoice_items', 'inventory_id');

    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('invoice_id') !== -1,
    );
    await queryRunner.dropForeignKey('detail_invoice_items', foreignKey2);
    await queryRunner.dropColumn('detail_invoice_items', 'invoice_id');

    await queryRunner.dropTable('detail_invoice_items');
  }
}
