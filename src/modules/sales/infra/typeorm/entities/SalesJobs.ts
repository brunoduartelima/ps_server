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
import Job from '@modules/jobs/infra/typeorm/entities/Job';
  
@Entity('sales_jobs')
class SalesJobs {
  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal')
    price: number;

    @Column('decimal')
    descont: number;

    @Column('int')
    quantity: number;
  
    @ManyToOne(() => Sale, sale => sale.sale_jobs)
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;
  
    @ManyToOne(() => Job, job => job.sale_jobs)
    @JoinColumn({ name: 'job_id' })
    job: Job;
  
    @Column()
    sale_id: string;
  
    @Column()
    job_id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}
  
export default SalesJobs;