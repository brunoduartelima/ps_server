import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
} from 'typeorm';

import ShopsClients from '@modules/shops/infra/typeorm/entities/ShopsClients';

@Entity('clients')
class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    address: string;

    @Column()
    address_number: string;

    @Column()
    neighborhood: string;

    @Column()
    cep: string;

    @Column()
    sex: string;

    @Column()
    phone: string;

    @Column()
    date_birth: Date;

    @Column()
    email?: string;

    @OneToMany(() => ShopsClients, shop_clients => shop_clients.client, {
        cascade: true,
    })
    shop_clients: ShopsClients[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}

export default Client;