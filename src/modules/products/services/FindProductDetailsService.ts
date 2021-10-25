import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    company_id: string;
}

@injectable()
class FindProductDetailsService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ id, company_id }: IRequest): Promise<Product> {
        const product = await this.productsRepository.findById(id, company_id);

        if(!product)
            throw new AppError('Product not found');

        return product;
    }

}

export default FindProductDetailsService;