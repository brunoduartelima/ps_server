import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
    shop_id: string;
    page: number;
}

@injectable()
class FindAllProductsFromShopService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ shop_id, page }: IRequest): Promise<Product[]> {
        const products = await this.productsRepository.findAllProductsFromShop(shop_id, page);

        if(!products)
            throw new AppError('Products not found');

        return products;
    }

}

export default FindAllProductsFromShopService;