import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Shop from './Shop';

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

    // @ManyToOne(() => Shop)
    // @JoinColumn({ name: 'shop_id' })
    // shop: Shop;

    // @Column()
    // shop_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Sales;