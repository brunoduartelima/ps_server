import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateStocks1626694931005 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'stocks',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'type',
                        type: 'varchar'
                    },
                    {
                        name: 'supplier',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'quantity',
                        type: 'int'
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone'
                    },
                    {
                        name: 'company_id',
                        type: 'uuid',
                    },
                    {
                        name: 'product_id',
                        type: 'uuid'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                ]
            }),
        );

        await queryRunner.createForeignKeys(
            'stocks', [
                new TableForeignKey({
                    name: 'StockCompany',
                    columnNames: ['company_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'companies',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'StockProduct',
                    columnNames: ['product_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'products',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
            ],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stocks', 'StockProduct');
        await queryRunner.dropForeignKey('stocks', 'StockCompany');
        await queryRunner.dropTable('stocks');
    }

}
