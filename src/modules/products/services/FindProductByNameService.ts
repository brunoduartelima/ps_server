import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
    name: string;
    shop_id: string;
}

@injectable()
class FindProductByNameService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ shop_id, name }: IRequest): Promise<Product[]> {
        const products = await this.productsRepository.findProductByName(shop_id, name);

        if(!products)
            throw new AppError('Products not found');

        return products;
    }

}

export default FindProductByNameService;