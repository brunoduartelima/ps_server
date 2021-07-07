import { getRepository, Repository, ILike, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';

import Product from '../entities/Product';

interface IFindProducts {
    id: string;
}

class ProductsRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    public async findById(id: string, company_id: string): Promise<Product | undefined> {
        const product = await this.ormRepository.findOne({ where: { id, company_id }, withDeleted: true });

        return product;
    }

    public async findAllById(products: IFindProducts[], company_id: string): Promise<Product[]> {
        const productIds = products.map(product => product.id);
    
        const existentProducts = await this.ormRepository.findByIds(productIds, { 
            where: { company_id }
        });
    
        return existentProducts;
    }

    public async findAllProductsFromCompany(company_id: string, page: number): Promise<Product[] | undefined> {
        const products = await this.ormRepository.find({ 
            where: { company_id }, 
            order: { name:'ASC' },
            take: 30,
            skip: (page - 1) * 30
        });

        return products;
    }

    public async findNewlyAddProducts(company_id: string): Promise<Product[] | undefined> {
        const products = await this.ormRepository.find({ 
            where: { company_id }, 
            order: { created_at: 'DESC' },
            take: 15
        });

        return products;
    }

    public async findProductByName(company_id: string, name: string): Promise<Product[] | undefined> {
        const products = this.ormRepository.find({
            where: {
                company_id,
                name: ILike(`%${name}%`)
            },
            order: { name: 'ASC'}
        });

        return products;
    }

    public async findNameForControl(company_id: string, name: string): Promise<Product | undefined> {
        const product = await this.ormRepository.findOne({
            where: { name, company_id }
        });

        return product;
    }

    public async updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]> {
        return await this.ormRepository.save(products);
    }

    public async create({ name, code, description, price, quantity, average_cost, company_id }: ICreateProductDTO): Promise<Product> {
        const product = this.ormRepository.create({ name, code, description, price, quantity, average_cost, company_id });

        await this.ormRepository.save(product);

        return product;
    }

    public async save(product: Product): Promise<Product> {
        return await this.ormRepository.save(product);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default ProductsRepository;