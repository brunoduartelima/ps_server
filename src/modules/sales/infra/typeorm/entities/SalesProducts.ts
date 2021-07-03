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
import Product from '@modules/products/infra/typeorm/entities/Product';
  
@Entity('sales_products')
class SalesProducts {
  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal')
    price: number;

    @Column('decimal')
    descont: number;

    @Column('int')
    quantity: number;
  
    @ManyToOne(() => Sale, sale => sale.sale_products)
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;
  
    @ManyToOne(() => Product, product => product.sale_products)
    @JoinColumn({ name: 'product_id' })
    product: Product;
  
    @Column()
    sale_id: string;
  
    @Column()
    product_id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}
  
export default SalesProducts;