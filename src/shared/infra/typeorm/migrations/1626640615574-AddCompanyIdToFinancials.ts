import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCompanyIdToFinancials1626640615574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'financials',
            new TableColumn({
                name: 'company_id',
                type: 'uuid'
            }),
        );

        await queryRunner.createForeignKey(
            'financials',
            new TableForeignKey({
                name: 'FinancialCompany',
                columnNames: ['company_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'companies',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('financials', 'FinancialCompany');
        await queryRunner.dropColumn('financials', 'company_id');
    }
}
