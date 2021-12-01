import { inject, injectable } from 'tsyringe';

import ISalesRepository from '../repositories/ISalesRepository';
import Sale from '../infra/typeorm/entities/Sale';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    company_id: string;
}

@injectable()
class FindSaleDetailsService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
    ) {}

    public async execute({ id, company_id }: IRequest): Promise<Sale> {
        const sale = await this.salesRepository.findById(id, company_id);

        if(!sale)
            throw new AppError('Sale not found');

        return sale;
    }

}

export default FindSaleDetailsService;