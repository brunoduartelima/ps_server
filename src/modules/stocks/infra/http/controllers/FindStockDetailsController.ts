import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindStockDetailsService from '@modules/stocks/services/FindStockDetailsService';

export default class FindStockDetailsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { id } = request.params;

        const findStock = container.resolve(FindStockDetailsService);

        const stock = await findStock.execute({ company_id, id });

        return response.json(stock);
    }
}