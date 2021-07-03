import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    DeleteDateColumn,
} from 'typeorm';

import SalesEmployees from '@modules/sales/infra/typeorm/entities/SalesEmployees';
import Company from '@modules/companies/infra/typeorm/entities/Company';

@Entity('employees')

class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('decimal')
    salary: number;

    @Column()
    date_birth: Date;

    @Column()
    phone: string;

    @Column('boolean')
    active: boolean;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @Column()
    company_id: string;

    @OneToMany(() => SalesEmployees, sale_employees => sale_employees.employee, {
        cascade: true,
    })
    sale_employees: SalesEmployees[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

export default Employee;