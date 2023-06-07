import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISalesRepository from '../repositories/ISalesRepository';
import Sale from '../infra/typeorm/entities/Sale';

interface IRequest {
    company_id: string;
    page: number;
}

@injectable()
class FindAllSalesFromCompanyService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
    ) {}

    public async execute({ company_id, page }: IRequest): Promise<[Sale[], number]> {
        const sales = await this.salesRepository.findAllSalesFromCompany(company_id, page);

        if(!sales)
            throw new AppError('Sales not found');

        return sales;
    }

}

export default FindAllSalesFromCompanyService;