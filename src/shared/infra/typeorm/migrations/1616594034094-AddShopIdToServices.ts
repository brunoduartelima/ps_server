import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddShopIdToServices1616594034094 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'services',
            new TableColumn({
                name: 'shop_id',
                type: 'uuid'
            }),
        );

        await queryRunner.createForeignKey(
            'services',
            new TableForeignKey({
                name: 'ServiceShop',
                columnNames: ['shop_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'shops',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('services', 'ServiceShop');
        await queryRunner.dropColumn('services', 'shop_id');
    }

}
