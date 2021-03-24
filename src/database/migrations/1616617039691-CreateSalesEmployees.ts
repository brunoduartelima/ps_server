import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSalesEmployees1616617039691 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'sales_employees',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'commission',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        default: 0
                    },
                    {
                        name: 'sale_id',
                        type: 'uuid',
                    },
                    {
                        name: 'employee_id',
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

        await queryRunner.createForeignKeys(
            'sales_employees', [
                new TableForeignKey({
                    name: 'SaleEmployee',
                    columnNames: ['sale_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'sales',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'EmployeeSale',
                    columnNames: ['employee_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'employees',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
            ],
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('sales_employees', 'EmployeeSale');
        await queryRunner.dropForeignKey('sales_employees', 'SaleEmployee');
        await queryRunner.dropTable('sales_employees');
    }

}
