import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCompanyIdAndCustomerIdToSales1616612509482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'sales', [
                new TableColumn({
                    name: 'company_id',
                    type: 'uuid'
                }),
                new TableColumn({
                    name: 'customer_id',
                    type: 'uuid'
                }),
            ],
        );

        await queryRunner.createForeignKeys(
            'sales', [
                new TableForeignKey({
                    name: 'SaleCompany',
                    columnNames: ['company_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'companies',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'SaleCustomer',
                    columnNames: ['customer_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'customers',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
            ],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('sales', 'SaleCustomer');
        await queryRunner.dropForeignKey('sales', 'SaleCompany');
        await queryRunner.dropColumn('sales', 'customer_id');
        await queryRunner.dropColumn('sales', 'company_id');
    }

}
