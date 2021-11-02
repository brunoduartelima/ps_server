import { getRepository, Repository } from 'typeorm';

import IStocksRepository from '@modules/stocks/repositories/IStocksRepository';
import ICreateStockDTO from '@modules/stocks/dtos/ICreateStockDTO';

import Stock from '../entities/Stock';

class StocksRepository implements IStocksRepository {
    private ormRepository: Repository<Stock>;

    constructor() {
        this.ormRepository = getRepository(Stock);
    }

    public async findById(id: string, company_id: string): Promise<Stock | undefined> {
        const stock = await this.ormRepository.findOne({ where: { id, company_id } });

        return stock;
    }

    public async findAllStocksFromCompany(company_id: string, page: number): Promise<[Stock[], number] | undefined> {
        const stock = await this.ormRepository.findAndCount({ 
            where: { company_id }, 
            order: { date:'ASC' },
            take: 10,
            skip: (page - 1) * 10
        });

        return stock;
    }

    public async findNewlyAddStocks(company_id: string): Promise<Stock[] | undefined> {
        const stocks = await this.ormRepository.find({ 
            where: { company_id }, 
            order: { created_at: 'DESC' },
            take: 10
        });

        return stocks;
    }

    public async create({ value, type, supplier, description, quantity, date, company_id, product_id }: ICreateStockDTO): Promise<Stock> {
        const stock = this.ormRepository.create({ value, type, supplier, description, quantity, date, company_id, product_id });

        await this.ormRepository.save(stock);

        return stock;
    }

    public async save(stock: Stock): Promise<Stock> {
        return await this.ormRepository.save(stock);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default StocksRepository;