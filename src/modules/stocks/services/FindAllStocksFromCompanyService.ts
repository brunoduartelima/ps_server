import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStocksRepository from '../repositories/IStocksRepository';
import Stock from '../infra/typeorm/entities/Stock';

interface IRequest {
    company_id: string;
    page: number;
}

@injectable()
class FindAllStocksFromCompanyService {
    constructor(
        @inject('StocksRepository')
        private stocksRepository: IStocksRepository,
    ) {}

    public async execute({ company_id, page }: IRequest): Promise<[Stock[], number]> {
        const stocks = await this.stocksRepository.findAllStocksFromCompany(company_id, page);

        if(!stocks)
            throw new AppError('Stocks not found');

        return stocks;
    }

}

export default FindAllStocksFromCompanyService;