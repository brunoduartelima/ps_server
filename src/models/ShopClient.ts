import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';

  import Client from './Client';
import Shop from './Shop';
  
  @Entity('shops_clients')
  class ShopsClients {
  
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Shop, shop => shop.shop_clients)
    @JoinColumn({ name: 'shop_id' })
    shop: Shop;
  
    @ManyToOne(() => Client, client => client.shop_clients)
    @JoinColumn({ name: 'client_id' })
    client: Client;
  
    @Column()
    shop_id: string;
  
    @Column()
    client_id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default ShopsClients;