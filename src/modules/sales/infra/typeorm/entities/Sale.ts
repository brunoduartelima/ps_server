import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import SalesEmployees from './SalesEmployees';
import SalesProducts from './SalesProducts';
import SalesJobs from './SalesJobs';

@Entity('sales')
class Sales {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column('timestamp with time zone')
    date: Date;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @Column()
    company_id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column()
    customer_id: string;

    @OneToMany(() => SalesEmployees, sale_employees => sale_employees.sale, {
        cascade: true,
    })
    sale_employees: SalesEmployees[];

    @OneToMany(() => SalesProducts, sale_products => sale_products.sale, {
        cascade: true,
    })
    sale_products: SalesProducts[];

    @OneToMany(() => SalesJobs, sale_jobs => sale_jobs.sale, {
        cascade: true,
    })
    sale_jobs: SalesJobs[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Sales;