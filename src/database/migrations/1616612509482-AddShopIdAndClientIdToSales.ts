import {Column, MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddShopIdAndClientIdToSales1616612509482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'sales', [
                new TableColumn({
                    name: 'shop_id',
                    type: 'uuid'
                }),
                new TableColumn({
                    name: 'client_id',
                    type: 'uuid'
                }),
            ],
        );

        await queryRunner.createForeignKeys(
            'sales', [
                new TableForeignKey({
                    name: 'SaleShop',
                    columnNames: ['shop_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'shops',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'SaleClient',
                    columnNames: ['client_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'clients',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
            ],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('sales', 'SaleClient');
        await queryRunner.dropForeignKey('sales', 'SaleShop');
        await queryRunner.dropColumn('sales', 'client_id');
        await queryRunner.dropColumn('sales', 'shop_id');
    }

}
