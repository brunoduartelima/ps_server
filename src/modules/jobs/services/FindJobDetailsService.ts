import { inject, injectable } from 'tsyringe';

import IJobsRepository from '../repositories/IJobsRepository';
import Job from '../infra/typeorm/entities/Job';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    company_id: string;
}

@injectable()
class FindJobDetailsService {
    constructor(
        @inject('JobsRepository')
        private jobsRepository: IJobsRepository,
    ) {}

    public async execute({ id, company_id }: IRequest): Promise<Job> {
        const job = await this.jobsRepository.findById(id, company_id);

        if(!job)
            throw new AppError('Job not found');

        return job;
    }

}

export default FindJobDetailsService;