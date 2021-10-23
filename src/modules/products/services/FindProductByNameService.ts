import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
    name: string;
    company_id: string;
    page: number
}

@injectable()
class FindProductByNameService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ company_id, name, page }: IRequest): Promise<[Product[], number]> {
        const products = await this.productsRepository.findProductByName(company_id, name, page);

        if(!products)
            throw new AppError('Products not found');

        return products;
    }

}

export default FindProductByNameService;