import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IJobsRepository from '../repositories/IJobsRepository';
import Job from '@modules/jobs/infra/typeorm/entities/Job';

interface IRequest {
    name: string;
    description?: string;
    price: number;
    average_time: Date;
    company_id: string;
}

@injectable()
class CreateJobService {
    constructor(
        @inject('JobsRepository')
        private jobsRepository: IJobsRepository,
    ) {}

    public async execute({ name, description, price, average_time, company_id }: IRequest): Promise<Job> {
        const jobName = await this.jobsRepository.findNameForControl(company_id, name);

        if(jobName)
            throw new AppError('The name of this job is already in use.');

        const job = await this.jobsRepository.create({
            name, 
            description, 
            price, 
            average_time,
            company_id
        });

        return job;
    }

}

export default CreateJobService;