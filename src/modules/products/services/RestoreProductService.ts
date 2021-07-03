import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    company_id: string;
}

@injectable()
class RestoreProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ id, company_id }: IRequest): Promise<void> {
        const product = await this.productsRepository.findById(id, company_id);

        if(!product)
            throw new AppError('Product not found');

        await this.productsRepository.restore(id);
    }

}

export default RestoreProductService;