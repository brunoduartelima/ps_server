import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Company from '@modules/companies/infra/typeorm/entities/Company';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @Column()
    company_id: string;

    @OneToOne(() => Employee)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @Column()
    employee_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

export default User;