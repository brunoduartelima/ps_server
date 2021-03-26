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

import Shop from './Shop';
import Client from './Client';
import SalesEmployees from './SalesEmployees';
import SalesProducts from './SalesProducts';

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

    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column()
    shop_id: string;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column()
    client_id: string;

    @OneToMany(() => SalesEmployees, sale_employees => sale_employees.sale, {
        cascade: true,
    })
    sale_employees: SalesEmployees[];

    @OneToMany(() => SalesProducts, sale_products => sale_products.sale, {
        cascade: true,
    })
    sale_products: SalesProducts[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Sales;