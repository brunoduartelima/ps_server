import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
    DeleteDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import CompaniesCustomers from './CompaniesCustomers';

@Entity('companies')
class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    company_type: string;

    @Column()
    uf: string;

    @Column()
    city: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: string;

    @OneToMany(() => CompaniesCustomers, company_customers => company_customers.company, {
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

export default Company;