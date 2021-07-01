import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToCompanies1616418700136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'companies',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
            }),
        );

        await queryRunner.createForeignKey(
            'companies',
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
        await queryRunner.dropForeignKey('companies', 'UserShop');
        await queryRunner.dropColumn('companies', 'user_id');
    }

}
