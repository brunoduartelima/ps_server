import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Stock from '@modules/stocks/infra/typeorm/entities/Stock';
import IStocksRepository from '../repositories/IStocksRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
    id: string;
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
class UpdateStockService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('StocksRepository')
        private stocksRepository: IStocksRepository,
    ) {}

    public async execute({ id, value, type, supplier, description, quantity, date, company_id, product_id }: IRequest): Promise<Stock> {
        // const product = await this.productsRepository.findById(product_id, company_id);
        const stock = await this.stocksRepository.findById(id, company_id);

        // if(!product)
        //     throw new AppError('Product not found');
        
        if(!stock)
            throw new AppError('Operation stock not found');
        
        // if(product_id !== product.id)
        //     throw new AppError("Don't alter product for stock");

        // if(stock.type !== type)
        //     throw new AppError("Don't alter type for stock");
        
        // if(type === 'Entrada') {
        //     if (stock.quantity > quantity)

        //     const lastProductCost = product.quantity * product.average_cost;

        //     product.average_cost = (lastProductCost + value) / (product.quantity + quantity);

        //     product.quantity += quantity;
        // } else {
        //     if(quantity > product.quantity)
        //         throw new AppError('Invalid product quantity.');
            
        //     product.quantity -= quantity;
        // }

        // const stock = await this.stocksRepository.Update({
        //     value,
        //     type,
        //     supplier,
        //     description,
        //     quantity,
        //     date,
        //     company_id,
        //     product_id
        // });

        // await this.productsRepository.save(product);

        return stock;
    
    }

}

export default UpdateStockService;