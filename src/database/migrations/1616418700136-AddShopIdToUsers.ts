import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddShopIdToUsers1616418700136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'shop_id',
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                name: 'UserShop',
                columnNames: ['shop_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'shops',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'UserShop');
        await queryRunner.dropColumn('users', 'shop_id');
    }

}
