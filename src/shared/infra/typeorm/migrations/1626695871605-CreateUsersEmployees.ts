import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUsersEmployees1626695871605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_employees',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'company_id',
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
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true
                    },
                ],
            }),
        );

        await queryRunner.createForeignKeys(
            'users_employees', [
                new TableForeignKey({
                    name: 'UserEmployeeCompany',
                    columnNames: ['company_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'companies',
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                }),
                new TableForeignKey({
                    name: 'UserEmployeeEmployee',
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
        await queryRunner.dropForeignKey('users_employees', 'UserEmployeeEmployee');
        await queryRunner.dropForeignKey('users_employees', 'UserEmployeeCompany');
        await queryRunner.dropTable('users_employees');
    }

}
