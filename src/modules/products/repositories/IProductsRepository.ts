import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IEmployeesRepository {
    findById(id: string, shop_id: string): Promise<Product | undefined>;
    findAllProductsFromShop(shop_id: string, page: number): Promise<Product[] | undefined>;
    findNewlyAddProducts(shop_id: string): Promise<Product[] | undefined>;
    findProductByName(shop_id: string, name: string): Promise<Product[] | undefined>;
    findNameForControl(shop_id: string, name: string): Promise<Product | undefined>;
    create(data: ICreateProductDTO): Promise<Product>;
    save(Product: Product): Promise<Product>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}