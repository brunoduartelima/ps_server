import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Company from './Company';
  
@Entity('companies_customers')
class CompaniesCustomer {
  
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Company, company => company.company_customers)
    @JoinColumn({ name: 'company_id' })
    company: Company;
  
    @ManyToOne(() => Customer, customer => customer.company_customers)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
  
    @Column()
    company_id: string;
  
    @Column()
    customer_id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}
  
export default CompaniesCustomer;