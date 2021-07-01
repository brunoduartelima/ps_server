import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCompanyIdToProducts1616593918304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'company_id',
                type: 'uuid'
            }),
        );

        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                name: 'ProductCompany',
                columnNames: ['company_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'companies',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ProductCompany');
        await queryRunner.dropColumn('products', 'company_id');
    }

}
