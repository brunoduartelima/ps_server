import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Stock from '@modules/stocks/infra/typeorm/entities/Stock';
import IStocksRepository from '../repositories/IStocksRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
    value: number;
    type: 'Entrada' | 'Saída';
    supplier: string;
    description?: string;
    quantity: number;
    date: Date;
    company_id: string;
    product_id: string;
}

@injectable()
class CreateStockService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('StocksRepository')
        private stocksRepository: IStocksRepository,
    ) {}

    public async execute({ value, type, supplier, description, quantity, date, company_id, product_id }: IRequest): Promise<Stock> {
        const product = await this.productsRepository.findById(product_id, company_id);

        if(!product)
            throw new AppError('Product not found');
        
        if(type === 'Entrada') {
            const lastProductCost = product.quantity * product.average_cost;

            product.average_cost = (lastProductCost + value) / (product.quantity + quantity);

            product.quantity += quantity;
        } else {
            if(quantity > product.quantity)
                throw new AppError('Invalid product quantity.');
            
            product.quantity -= quantity;
        }

        const stock = await this.stocksRepository.create({
            value,
            type,
            supplier,
            description,
            quantity,
            date,
            company_id,
            product_id
        });

        await this.productsRepository.save(product);

        return stock;
    
    }

}

export default CreateStockService;