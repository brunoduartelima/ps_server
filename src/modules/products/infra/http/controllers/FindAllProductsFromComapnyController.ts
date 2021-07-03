import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllProductsFromCompanyService from '@modules/products/services/FindAllProductsFromCompanyService';

export default class FindAllProductsFromCompanyController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { page = 1 } = request.query;

        const findProducts = container.resolve(FindAllProductsFromCompanyService);

        const products = await findProducts.execute({ company_id, page: Number(page) });

        return response.json(products);
    }
}