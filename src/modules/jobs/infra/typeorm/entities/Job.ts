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

import Company from '@modules/companies/infra/typeorm/entities/Company';

@Entity('jobs')
class Job {
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

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @Column()
    company_id: string;

    // @OneToMany(() => SalesJobs, sale_jobs => sale_jobs.job, {
    //     cascade: true,
    // })
    // sale_jobs: SalesJobs[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Job;