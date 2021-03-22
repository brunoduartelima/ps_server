import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import Shop from './Shop';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    shop_id: string;

    @OneToOne(() => Shop)
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;

    @Column()
    name: string;

    @Column()
    @Exclude()
    cpf: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;