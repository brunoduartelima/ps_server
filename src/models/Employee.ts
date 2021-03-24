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
import SalesEmployees from './SalesEmployees';

import Shop from './Shop';

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

    @Column('boolean')
    active: boolean;

    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column()
    shop_id: string;

    @OneToMany(() => SalesEmployees, sale_employees => sale_employees.employee, {
        cascade: true,
    })
    sale_employees: SalesEmployees[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Employee;