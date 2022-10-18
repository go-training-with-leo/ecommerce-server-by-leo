import {
  Table,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  MigrationInterface,
} from 'typeorm';

export class Product1666090309937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'detail',
            type: 'varchar',
          },
          {
            name: 'garment_care',
            type: 'varchar',
          },
          {
            name: 'price',
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
      'products',
      new TableColumn({
        name: 'discount_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        columnNames: ['discount_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'discounts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('products');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('discount_id') !== -1,
    );
    await queryRunner.dropForeignKey('products', foreignKey);
    await queryRunner.dropColumn('products', 'discount_id');
    await queryRunner.dropTable('products');

    await queryRunner.dropTable('products');
  }
}
