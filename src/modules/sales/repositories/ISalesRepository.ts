import Sale from '../infra/typeorm/entities/Sale';
import ICreateSaleDTO from '../dtos/ICreateSaleDTO';

export default interface ISalesRepository {
    findById(id: string, company_id: string): Promise<Sale | undefined>;
    findAllSalesFromCompany(company_id: string, page: number): Promise<[Sale[], number] | undefined>;
    findNewlyAddSales(company_id: string): Promise<Sale[] | undefined>;
    create(data: ICreateSaleDTO): Promise<Sale>;
    save(sale: Sale): Promise<Sale>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}