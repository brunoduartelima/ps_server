import { getRepository, Repository, ILike } from 'typeorm';

import IJobsRepository from '@modules/jobs/repositories/IJobsRepository';
import ICreateJobDTO from '@modules/jobs/dtos/ICreateJobDTO';

import Job from '../entities/Job';

interface IFindJobs {
    id: string;
}

class JobsRepository implements IJobsRepository {
    private ormRepository: Repository<Job>;

    constructor() {
        this.ormRepository = getRepository(Job);
    }

    public async findById(id: string, company_id: string): Promise<Job | undefined> {
        const job = await this.ormRepository.findOne({ where: { id, company_id } });

        return job;
    }

    public async findAllById(jobs: IFindJobs[], company_id: string): Promise<Job[]> {
        const jobIds = jobs.map(job => job.id);
    
        const existentJobs = await this.ormRepository.findByIds(jobIds, { 
            where: { company_id }
        });
    
        return existentJobs;
    }

    public async findAllJobsFromCompany(company_id: string, page: number): Promise<[Job[], number] | undefined> {
        const jobs = await this.ormRepository.findAndCount({ 
            where: { company_id }, 
            order: { name:'ASC' },
            take: 10,
            skip: (page - 1) * 10
        });

        return jobs;
    }

    public async findNewlyAddJobs(company_id: string): Promise<Job[] | undefined> {
        const jobs = await this.ormRepository.find({ 
            where: { company_id }, 
            order: { created_at: 'DESC' },
            take: 10
        });

        return jobs;
    }

    public async findJobByName(company_id: string, name: string, page: number): Promise<[Job[], number] | undefined> {
        const jobs = this.ormRepository.findAndCount({
            where: {
                company_id,
                name: ILike(`%${name}%`)
            },
            order: { name: 'ASC'},
            take: 10,
            skip: (page - 1) * 10
        });

        return jobs;
    }

    public async findNameForControl(company_id: string, name: string): Promise<Job | undefined> {
        const job = await this.ormRepository.findOne({
            where: { name, company_id }
        });

        return job;
    }

    public async create({ name, description, price, average_time, company_id }: ICreateJobDTO): Promise<Job> {
        const job = this.ormRepository.create({ name, description, price, average_time, company_id });

        await this.ormRepository.save(job);

        return job;
    }

    public async save(job: Job): Promise<Job> {
        return await this.ormRepository.save(job);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default JobsRepository;