import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IJobsRepository from '../repositories/IJobsRepository';
import Job from '../infra/typeorm/entities/Job';

interface IRequest {
    company_id: string;
    page: number;
}

@injectable()
class FindAllJobsFromCompanyService {
    constructor(
        @inject('JobsRepository')
        private jobsRepository: IJobsRepository,
    ) {}

    public async execute({ company_id, page }: IRequest): Promise<Job[]> {
        const jobs = await this.jobsRepository.findAllJobsFromCompany(company_id, page);

        if(!jobs)
            throw new AppError('Jobs not found');

        return jobs;
    }

}

export default FindAllJobsFromCompanyService;