import {
  Table,
  TableColumn,
  QueryRunner,
  TableForeignKey,
  MigrationInterface,
} from 'typeorm';

export class Token1663056214120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'access_token',
            type: 'varchar',
          },
          {
            name: 'refresh_token',
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
      'tokens',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'tokens',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tokens');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('tokens', foreignKey);
    await queryRunner.dropColumn('tokens', 'user_id');
    await queryRunner.dropTable('tokens');

    await queryRunner.dropTable('tokens');
  }
}
