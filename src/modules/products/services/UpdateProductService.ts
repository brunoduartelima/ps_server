import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
    id: string;
    name: string;
    code?: string;
    description?: string;
    price: number;
    quantity: number;
    average_cost: number;
    company_id: string;
}

@injectable()
class UpdateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ id, name, code, description, price, quantity, average_cost, company_id }: IRequest): Promise<Product> {
        const product = await this.productsRepository.findById(id, company_id);

        if(!product)
            throw new AppError('Product not found');

        if(product.name !== name) {
            const productName = await this.productsRepository.findNameForControl(company_id, name);

            if(productName)
                throw new AppError('The name of this product is already in use.');
        }

        if(product.deleted_at !== null)
            throw new AppError('Product deleted, operation not permitted');

            product.name = name;
            product.code = code; 
            product.description = description; 
            product.price = price; 
            product.quantity = quantity; 
            product.average_cost = average_cost;

        return this.productsRepository.save(product);
    }

}

export default UpdateProductService;