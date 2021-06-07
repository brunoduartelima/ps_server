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
// import SalesEmployees from './SalesEmployees';

import Shop from '@modules/shops/infra/typeorm/entities/Shop';

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

    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column()
    shop_id: string;

    // @OneToMany(() => SalesEmployees, sale_employees => sale_employees.employee, {
    //     cascade: true,
    // })
    // sale_employees: SalesEmployees[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

export default Employee;