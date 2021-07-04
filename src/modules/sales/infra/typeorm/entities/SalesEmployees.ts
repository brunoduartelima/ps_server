import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';

import Sale from './Sale';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
  
@Entity('sales_employees')
class SalesEmployees {
  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal')
    commission?: number;
  
    @ManyToOne(() => Sale, sale => sale.sale_employees)
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;
  
    @ManyToOne(() => Employee, employee => employee.sale_employees)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;
  
    @Column()
    sale_id: string;
  
    @Column()
    employee_id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}
  
export default SalesEmployees;