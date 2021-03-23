import {Column, MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateShopsClients1616420295322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'shops_clients',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'shop_id',
                        type: 'uuid',
                    },
                    {
                        name: 'client_id',
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
            'shops_clients',
            new TableForeignKey({
                name: 'ShopClient',
                columnNames: ['shop_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'shops',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'shops_clients',
            new TableForeignKey({
                name: 'ClientShop',
                columnNames: ['client_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'clients',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('shops_clients', 'ClientShop');
        await queryRunner.dropForeignKey('shops_clients', 'ShopClient');
        await queryRunner.dropTable('shops_clients');
    }

}
