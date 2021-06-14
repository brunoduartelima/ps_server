import { getRepository, Repository, ILike } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    public async findById(id: string, shop_id: string): Promise<Product | undefined> {
        const product = await this.ormRepository.findOne({ where: { id, shop_id }, withDeleted: true });

        return product;
    }

    public async findAllProductsFromShop(shop_id: string, page: number): Promise<Product[] | undefined> {
        const products = await this.ormRepository.find({ 
            where: { shop_id }, 
            order: { name:'ASC' },
            take: 30,
            skip: (page - 1) * 30
        });

        return products;
    }

    public async findNewlyAddProducts(shop_id: string): Promise<Product[] | undefined> {
        const products = await this.ormRepository.find({ 
            where: { shop_id }, 
            order: { created_at: 'DESC' },
            take: 15
        });

        return products;
    }

    public async findProductByName(shop_id: string, name: string): Promise<Product[] | undefined> {
        const products = this.ormRepository.find({
            where: {
                shop_id,
                name: ILike(`%${name}%`)
            },
            order: { name: 'ASC'}
        });

        return products;
    }

    public async create({ name, code, description, price, quantity, average_cost, shop_id }: ICreateProductDTO): Promise<Product> {
        const product = this.ormRepository.create({ name, code, description, price, quantity, average_cost, shop_id });

        await this.ormRepository.save(product);

        return product;
    }

    public async save(product: Product): Promise<Product> {
        return this.ormRepository.save(product);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default ProductsRepository;