import Stock from '../infra/typeorm/entities/Stock';
import ICreateStockDTO from '../dtos/ICreateStockDTO';

export default interface IStocksRepository {
    findById(id: string, company_id: string): Promise<Stock | undefined>;
    findAllStocksFromCompany(company_id: string, page: number): Promise<[Stock[], number] | undefined>;
    findNewlyAddStocks(company_id: string): Promise<Stock[] | undefined>;
    create(data: ICreateStockDTO): Promise<Stock>;
    save(Stock: Stock): Promise<Stock>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}