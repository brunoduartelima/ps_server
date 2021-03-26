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
import SalesProducts from './SalesProducts';

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    description: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @Column('decimal')
    average_cost: number;

    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column()
    shop_id: string;

    @OneToMany(() => SalesProducts, sale_products => sale_products.product, {
        cascade: true,
    })
    sale_products: SalesProducts[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Product;