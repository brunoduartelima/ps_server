import { inject, injectable } from 'tsyringe';

import IJobsRepository from '../repositories/IJobsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    company_id: string;
}

@injectable()
class DeleteJobService {
    constructor(
        @inject('JobsRepository')
        private jobsRepository: IJobsRepository,
    ) {}

    public async execute({ id, company_id }: IRequest): Promise<void> {
        const job = await this.jobsRepository.findById(id, company_id);

        if(!job)
            throw new AppError('Job not found');

        await this.jobsRepository.softDelete(id);
    }

}

export default DeleteJobService;