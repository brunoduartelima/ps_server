import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    DeleteDateColumn,
} from 'typeorm';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('stocks')
class Stock {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal')
    value: number;

    @Column()
    type: string;
    
    @Column()
    supplier: string;

    @Column()
    description?: string;

    @Column('int')
    quantity: number;

    @Column('timestamp with time zone')
    date: Date;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Company;

    @Column()
    company_id: string;

    @Column()
    product_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

export default Stock;