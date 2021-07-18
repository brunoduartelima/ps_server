import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllSalesFromCompanyService from '@modules/sales/services/FindAllSalesFromCompanyService';

export default class FindAllSalesFromCompanyController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { page = 1 } = request.query;

        const findSales = container.resolve(FindAllSalesFromCompanyService);

        const sales = await findSales.execute({ company_id, page: Number(page) });

        return response.json(sales);
    }
}