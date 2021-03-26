import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSalesServices1616759296277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'sales_services',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'descont',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        default: 0
                    },
                    {
                        name: 'quantity',
                        type: 'int'
                    },
                    {
                        name: 'sale_id',
                        type: 'uuid',
                    },
                    {
                        name: 'service_id',
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
                ]
            }),
        );

        await queryRunner.createForeignKeys(
            'sales_services', [
                new TableForeignKey({
                    name: 'SaleService',
                    columnNames: ['sale_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'sales',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'ServiceSale',
                    columnNames: ['service_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'services',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
            ],
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('sales_services', 'ServiceSale');
        await queryRunner.dropForeignKey('sales_services', 'SaleService');
        await queryRunner.dropTable('sales_services');
    }

}
