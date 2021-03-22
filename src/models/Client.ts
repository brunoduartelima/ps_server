import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Client;