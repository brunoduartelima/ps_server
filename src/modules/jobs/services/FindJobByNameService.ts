import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IJobsRepository from '../repositories/IJobsRepository';
import Job from '../infra/typeorm/entities/Job';

interface IRequest {
    name: string;
    company_id: string;
}

@injectable()
class FindJobByNameService {
    constructor(
        @inject('JobsRepository')
        private jobsRepository: IJobsRepository,
    ) {}

    public async execute({ company_id, name }: IRequest): Promise<Job[]> {
        const jobs = await this.jobsRepository.findJobByName(company_id, name);

        if(!jobs)
            throw new AppError('Jobs not found');

        return jobs;
    }

}

export default FindJobByNameService;