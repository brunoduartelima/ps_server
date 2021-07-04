import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '../dtos/IUpdateProductsQuantityDTO';

interface IFindProducts {
    id: string;
}

export default interface IProductsRepository {
    findById(id: string, company_id: string): Promise<Product | undefined>;
    findAllById(products: IFindProducts[], company_id: string): Promise<Product[]>;
    findAllProductsFromCompany(company_id: string, page: number): Promise<Product[] | undefined>;
    findNewlyAddProducts(company_id: string): Promise<Product[] | undefined>;
    findProductByName(company_id: string, name: string): Promise<Product[] | undefined>;
    findNameForControl(company_id: string, name: string): Promise<Product | undefined>;
    updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]>;
    create(data: ICreateProductDTO): Promise<Product>;
    save(product: Product): Promise<Product>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}