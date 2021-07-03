import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IJobsRepository from '../repositories/IJobsRepository';
import Job from '../infra/typeorm/entities/Job';

interface IRequest {
    company_id: string;
}

@injectable()
class FindNewlyAddJobsService {
    constructor(
        @inject('JobsRepository')
        private jobsRepository: IJobsRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<Job[]> {
        const jobs = await this.jobsRepository.findNewlyAddJobs(company_id);

        if(!jobs)
            throw new AppError('Jobs not found');

        return jobs;
    }

}

export default FindNewlyAddJobsService;