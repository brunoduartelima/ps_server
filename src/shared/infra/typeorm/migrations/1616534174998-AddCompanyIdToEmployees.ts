import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCompanyIdToEmployees1616534174998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'employees',
            new TableColumn({
                name: 'company_id',
                type: 'uuid'
            }),
        );

        await queryRunner.createForeignKey(
            'employees',
            new TableForeignKey({
                name: 'EmployeeCompany',
                columnNames: ['company_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'companies',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('employees', 'EmployeeCompany');
        await queryRunner.dropColumn('employees', 'company_id');
    }
}
