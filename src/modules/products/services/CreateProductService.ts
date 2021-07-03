import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '../repositories/IProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
    name: string;
    code?: string;
    description?: string;
    price: number;
    quantity: number;
    average_cost: number;
    company_id: string;
}

@injectable()
class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ name, code, description, price, quantity, average_cost, company_id }: IRequest): Promise<Product> {
        const productName = await this.productsRepository.findNameForControl(company_id, name);

        if(productName)
            throw new AppError('The name of this product is already in use.');

        const product = await this.productsRepository.create({
            name, 
            code, 
            description, 
            price, 
            quantity, 
            average_cost, 
            company_id
        });

        return product;
    }

}

export default CreateProductService;