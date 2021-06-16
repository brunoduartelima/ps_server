import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllProductsFromShopService from '@modules/products/services/FindAllProductsFromShopService';

export default class FindAllProductsFromShopController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { page = 1 } = request.query;

        const findProducts = container.resolve(FindAllProductsFromShopService);

        const products = await findProducts.execute({ shop_id, page: Number(page) });

        return response.json(products);
    }
}