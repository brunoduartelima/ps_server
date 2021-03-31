import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSalesProducts1616757762314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'sales_products',
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
                ]
            }),
        );

        await queryRunner.createForeignKeys(
            'sales_products', [
                new TableForeignKey({
                    name: 'SaleProduct',
                    columnNames: ['sale_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'sales',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'ProductSale',
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
        await queryRunner.dropForeignKey('sales_products', 'ProductSale');
        await queryRunner.dropForeignKey('sales_products', 'SaleProduct');
        await queryRunner.dropTable('sales_products');
    }

}
