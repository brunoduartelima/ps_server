import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToShops1616418700136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'shops',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'shops',
            new TableForeignKey({
                name: 'UserShop',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('shops', 'UserShop');
        await queryRunner.dropColumn('shops', 'user_id');
    }

}
