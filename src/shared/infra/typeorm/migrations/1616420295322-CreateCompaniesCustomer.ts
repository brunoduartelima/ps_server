import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCompaniesCustomers1616420295322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'companies_customers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'company_id',
                        type: 'uuid',
                    },
                    {
                        name: 'customer_id',
                        type: 'uuid'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            }),
        );

        await queryRunner.createForeignKey(
            'companies_customers',
            new TableForeignKey({
                name: 'CompanyCustomer',
                columnNames: ['company_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'companies',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'companies_customers',
            new TableForeignKey({
                name: 'CustomerCompany',
                columnNames: ['customer_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'customers',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('companies_customers', 'CustomerCompany');
        await queryRunner.dropForeignKey('companies_customers', 'CompanyCustomer');
        await queryRunner.dropTable('companies_customers');
    }

}
