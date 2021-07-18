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

@Entity('financials')
class Financials {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    type: string;

    @Column()
    description?: string;

    @Column('decimal')
    value: number;

    @Column('int')
    parcel_mount: number;

    @Column('timestamp with time zone')
    due_date: Date;

    @Column('boolean')
    active: boolean;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @Column()
    company_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

export default Financials;