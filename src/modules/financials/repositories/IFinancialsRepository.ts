import Financial from '../infra/typeorm/entities/Financial';
import ICreateFinancialDTO from '../dtos/ICreateFinancialDTO';

export default interface IFinancialsRepository {
    findById(id: string, company_id: string): Promise<Financial | undefined>;
    findAllFinancialsFromCompany(company_id: string, page: number): Promise<Financial[] | undefined>;
    findNewlyAddFinancials(company_id: string): Promise<Financial[] | undefined>;
    findFinancialByTitle(company_id: string, title: string): Promise<Financial[] | undefined>;
    findTitleForControl(company_id: string, title: string): Promise<Financial | undefined>;
    create(data: ICreateFinancialDTO): Promise<Financial>;
    save(financial: Financial): Promise<Financial>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}