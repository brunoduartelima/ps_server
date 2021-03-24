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

@Entity('services')
class Service {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('decimal')
    price: number;

    @Column('time')
    average_time: Date;

    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column()
    shop_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Service;