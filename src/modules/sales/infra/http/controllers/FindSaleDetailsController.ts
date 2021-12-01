import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindSaleDetailsService from '@modules/sales/services/FindSaleDetailsService';

export default class FindSaleDetailsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { id } = request.params;

        const findSale = container.resolve(FindSaleDetailsService);

        const sale = await findSale.execute({ company_id, id });

        return response.json(sale);
    }
}