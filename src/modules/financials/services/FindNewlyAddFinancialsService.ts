import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFinancialsRepository from '../repositories/IFinancialsRepository';
import Financial from '../infra/typeorm/entities/Financial';

interface IRequest {
    company_id: string;
}

@injectable()
class FindNewlyAddFinancialsService {
    constructor(
        @inject('FinancialsRepository')
        private financialsRepository: IFinancialsRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<Financial[]> {
        const financials = await this.financialsRepository.findNewlyAddFinancials(company_id);

        if(!financials)
            throw new AppError('Financial not found');

        return financials;
    }

}

export default FindNewlyAddFinancialsService;