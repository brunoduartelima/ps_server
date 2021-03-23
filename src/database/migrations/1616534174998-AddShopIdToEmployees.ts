import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddShopIdToEmployees1616534174998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'employees',
            new TableColumn({
                name: 'shop_id',
                type: 'uuid'
            }),
        );

        await queryRunner.createForeignKey(
            'employees',
            new TableForeignKey({
                name: 'EmployeeShop',
                columnNames: ['shop_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'shops',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('employees', 'EmployeeShop');
        await queryRunner.dropColumn('employees', 'shop_id');
    }
}
