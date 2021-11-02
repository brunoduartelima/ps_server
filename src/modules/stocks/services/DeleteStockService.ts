import { inject, injectable } from 'tsyringe';

import IStocksRepository from '../repositories/IStocksRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    company_id: string;
}

@injectable()
class DeleteStockService {
    constructor(
        @inject('StocksRepository')
        private stocksRepository: IStocksRepository,
    ) {}

    public async execute({ id, company_id }: IRequest): Promise<void> {
        const stock = await this.stocksRepository.findById(id, company_id);

        if(!stock)
            throw new AppError('Stock not found');

        await this.stocksRepository.softDelete(id);
    }

}

export default DeleteStockService;