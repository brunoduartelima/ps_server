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
import Service from './Service';
  
@Entity('sales_services')
class SalesServices {
  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal')
    price: number;

    @Column('decimal')
    descont: number;

    @Column('int')
    quantity: number;
  
    @ManyToOne(() => Sale, sale => sale.sale_services)
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;
  
    @ManyToOne(() => Service, service => service.sale_services)
    @JoinColumn({ name: 'service_id' })
    service: Service;
  
    @Column()
    sale_id: string;
  
    @Column()
    service_id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}
  
export default SalesServices;