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
  
    @Column({ name: 'company_id' })
    idCompany: string;
  
    @Column({ name: 'customer_id' })
    idCustomer: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
  
export default CompaniesCustomer;