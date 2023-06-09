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

    @Column({
        name: 'address_number'
    })
    addressNumber: string;

    @Column()
    neighborhood: string;

    @Column()
    cep: string;

    @Column()
    sex: string;

    @Column()
    phone: string;

    @Column({
        name: 'date_birth'
    })
    dateBirth: Date;

    @Column()
    email?: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at'
    })
    deletedAt: Date;

    @OneToMany(() => CompaniesCustomers, company_customers => company_customers.customer, {
        cascade: true,
    })
    company_customers: CompaniesCustomers[];
}

export default Customer;