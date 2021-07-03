import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
    findById(id: string, company_id: string): Promise<Product | undefined>;
    findAllProductsFromCompany(company_id: string, page: number): Promise<Product[] | undefined>;
    findNewlyAddProducts(company_id: string): Promise<Product[] | undefined>;
    findProductByName(company_id: string, name: string): Promise<Product[] | undefined>;
    findNameForControl(company_id: string, name: string): Promise<Product | undefined>;
    create(data: ICreateProductDTO): Promise<Product>;
    save(product: Product): Promise<Product>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}