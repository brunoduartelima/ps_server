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

    @Column({ name: 'company_type' })
    companyType: string;

    @Column()
    uf: string;

    @Column()
    city: string;

    @Column({ name: 'user_id' })
    idUser: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => CompaniesCustomers, company_customers => company_customers.company, {
        cascade: true,
    })
    company_customers: CompaniesCustomers[];
}

export default Company;