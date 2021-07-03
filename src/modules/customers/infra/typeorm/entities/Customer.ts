import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
} from 'typeorm';

import CompaniesCustomers from '@modules/companies/infra/typeorm/entities/CompaniesCustomers';

@Entity('customers')
class Customer {
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

    @OneToMany(() => CompaniesCustomers, company_customers => company_customers.customer, {
        cascade: true,
    })
    company_customers: CompaniesCustomers[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}

export default Customer;