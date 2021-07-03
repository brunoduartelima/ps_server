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

import Company from '@modules/companies/infra/typeorm/entities/Company';
import SalesProducts from '@modules/sales/infra/typeorm/entities/SalesProducts';

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    code?: string;

    @Column()
    description?: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @Column('decimal')
    average_cost: number;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @Column()
    company_id: string;

    @OneToMany(() => SalesProducts, sale_products => sale_products.product, {
        cascade: true,
    })
    sale_products: SalesProducts[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

export default Product;