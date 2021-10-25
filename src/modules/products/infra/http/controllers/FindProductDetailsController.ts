import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindProductDetailsService from '@modules/products/services/FindProductDetailsService';

export default class FindProductDetailsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { id } = request.params;

        const findProduct = container.resolve(FindProductDetailsService);

        const product = await findProduct.execute({ company_id, id });

        return response.json(product);
    }
}