import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFinancials1626640078502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'financials',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'parcel_mount',
                        type: 'int'
                    },
                    {
                        name: 'active',
                        type: 'boolean'
                    },
                    {
                        name: 'due_date',
                        type: 'timestamp with time zone',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('financials');
    }
}
