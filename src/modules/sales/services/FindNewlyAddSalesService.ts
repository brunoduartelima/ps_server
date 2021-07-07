import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISalesRepository from '../repositories/ISalesRepository';
import Sale from '../infra/typeorm/entities/Sale';

interface IRequest {
    company_id: string;
}

@injectable()
class FindNewlyAddSalesService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<Sale[]> {
        const sales = await this.salesRepository.findNewlyAddSales(company_id);

        if(!sales)
            throw new AppError('Sale not found');

        return sales;
    }

}

export default FindNewlyAddSalesService;