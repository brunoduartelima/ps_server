import { inject, injectable } from 'tsyringe';

import IStocksRepository from '../repositories/IStocksRepository';
import Stock from '../infra/typeorm/entities/Stock';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    company_id: string;
}

@injectable()
class FindStockDetailsService {
    constructor(
        @inject('StocksRepository')
        private stocksRepository: IStocksRepository,
    ) {}

    public async execute({ id, company_id }: IRequest): Promise<Stock> {
        const stock = await this.stocksRepository.findById(id, company_id);

        if(!stock)
            throw new AppError('Stock not found');

        return stock;
    }

}

export default FindStockDetailsService;