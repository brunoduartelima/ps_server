import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFinancialsRepository from '../repositories/IFinancialsRepository';
import Financial from '../infra/typeorm/entities/Financial';

interface IRequest {
    title: string;
    company_id: string;
}

@injectable()
class FindFinancialByTitleService {
    constructor(
        @inject('FinancialsRepository')
        private financialsRepository: IFinancialsRepository,
    ) {}

    public async execute({ company_id, title }: IRequest): Promise<Financial[]> {
        const financials = await this.financialsRepository.findFinancialByTitle(company_id, title);

        if(!financials)
            throw new AppError('Financials not found');

        return financials;
    }

}

export default FindFinancialByTitleService;