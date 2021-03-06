import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
    company_id: string;
}

@injectable()
class FindNewlyAddProductsService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<Product[]> {
        const products = await this.productsRepository.findNewlyAddProducts(company_id);

        if(!products)
            throw new AppError('Product not found');

        return products;
    }

}

export default FindNewlyAddProductsService;