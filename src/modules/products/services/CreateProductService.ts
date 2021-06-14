import { inject, injectable } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';

import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
    name: string;
    code?: string;
    description?: string;
    price: number;
    quantity: number;
    average_cost: number;
    shop_id: string;
}

@injectable()
class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ name, code, description, price, quantity, average_cost, shop_id }: IRequest): Promise<Product> {
        const product = await this.productsRepository.create({
            name, 
            code, 
            description, 
            price, 
            quantity, 
            average_cost, 
            shop_id
        });

        return product;
    }

}

export default CreateProductService;