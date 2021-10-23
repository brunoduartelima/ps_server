import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
    company_id: string;
    page: number;
}

@injectable()
class FindAllProductsFromCompanyService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ company_id, page }: IRequest): Promise<[Product[], number]> {
        const products = await this.productsRepository.findAllProductsFromCompany(company_id, page);

        if(!products)
            throw new AppError('Products not found');

        return products;
    }

}

export default FindAllProductsFromCompanyService;