import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFinancialsRepository from '../repositories/IFinancialsRepository';
import Financial from '../infra/typeorm/entities/Financial';

interface IRequest {
    company_id: string;
    page: number;
}

@injectable()
class FindAllFinancialsFromCompanyService {
    constructor(
        @inject('FinancialsRepository')
        private financialsRepository: IFinancialsRepository,
    ) {}

    public async execute({ company_id, page }: IRequest): Promise<Financial[]> {
        const financials = await this.financialsRepository.findAllFinancialsFromCompany(company_id, page);

        if(!financials)
            throw new AppError('Financials not found');

        return financials;
    }

}

export default FindAllFinancialsFromCompanyService;