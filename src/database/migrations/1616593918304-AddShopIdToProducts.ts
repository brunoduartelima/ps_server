import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddShopIdToProducts1616593918304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'shop_id',
                type: 'uuid'
            }),
        );

        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                name: 'ProductShop',
                columnNames: ['shop_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'shops',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ProductShop');
        await queryRunner.dropColumn('products', 'shop_id');
    }

}
