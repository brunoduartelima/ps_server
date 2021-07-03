import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindProductByNameService from '@modules/products/services/FindProductByNameService';

export default class FindProductByNameController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { name } = request.query;

        const findProducts = container.resolve(FindProductByNameService);

        const products = await findProducts.execute({ company_id, name: String(name) });

        return response.json(products);
    }
}