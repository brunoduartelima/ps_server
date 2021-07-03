import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IJobsRepository from '../repositories/IJobsRepository';

import Job from '@modules/jobs/infra/typeorm/entities/Job';

interface IRequest {
    id: string;
    name: string;
    description?: string;
    price: number;
    average_time: Date;
    company_id: string;
}

@injectable()
class UpdateJobService {
    constructor(
        @inject('JobsRepository')
        private jobsRepository: IJobsRepository,
    ) {}

    public async execute({ id, name, description, price, average_time, company_id }: IRequest): Promise<Job> {
        const job = await this.jobsRepository.findById(id, company_id);

        if(!job)
            throw new AppError('Job not found');

        if(job.name !== name) {
            const jobName = await this.jobsRepository.findNameForControl(company_id, name);

            if(jobName)
                throw new AppError('The name of this job is already in use.');
        }

        if(job.deleted_at !== null)
            throw new AppError('Job deleted, operation not permitted');

            job.name = name; 
            job.description = description;
            job.price = price;  
            job.average_time = average_time;

        return this.jobsRepository.save(job);
    }

}

export default UpdateJobService;