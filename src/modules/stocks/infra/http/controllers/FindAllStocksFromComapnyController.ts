import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllStocksFromCompanyService from '@modules/stocks/services/FindAllStocksFromCompanyService';

export default class FindAllStocksFromCompanyController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { page = 1 } = request.query;

        const findStocks = container.resolve(FindAllStocksFromCompanyService);

        const stocks = await findStocks.execute({ company_id, page: Number(page) });

        return response.json(stocks);
    }
}