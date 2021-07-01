import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCompanyIdToJobs1616594034094 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'jobs',
            new TableColumn({
                name: 'company_id',
                type: 'uuid'
            }),
        );

        await queryRunner.createForeignKey(
            'jobs',
            new TableForeignKey({
                name: 'JobCompany',
                columnNames: ['company_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'companies',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('jobs', 'JobCompany');
        await queryRunner.dropColumn('jobs', 'company_id');
    }

}
