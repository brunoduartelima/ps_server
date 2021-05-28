import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
// import ShopsClients from './ShopsClients';

@Entity('shops')
class Shop {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    company_type: string;

    @Column()
    uf: string;

    @Column()
    city: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: string;

    // @OneToMany(() => ShopsClients, shop_clients => shop_clients.shop, {
    //     cascade: true,
    // })
    // shop_clients: ShopsClients[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Shop;