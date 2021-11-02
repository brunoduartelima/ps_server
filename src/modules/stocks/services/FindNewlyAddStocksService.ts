import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStocksRepository from '../repositories/IStocksRepository';
import Stock from '../infra/typeorm/entities/Stock';

interface IRequest {
    company_id: string;
}

@injectable()
class FindNewlyAddStocksService {
    constructor(
        @inject('StocksRepository')
        private stocksRepository: IStocksRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<Stock[]> {
        const stocks = await this.stocksRepository.findNewlyAddStocks(company_id);

        if(!stocks)
            throw new AppError('Stock not found');

        return stocks;
    }

}

export default FindNewlyAddStocksService;