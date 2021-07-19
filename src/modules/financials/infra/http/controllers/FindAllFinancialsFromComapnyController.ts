import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllFinancialsFromCompanyService from '@modules/financials/services/FindAllFinancialsFromCompanyService';

export default class FindAllFinancialsFromCompanyController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { page = 1 } = request.query;

        const findFinancials = container.resolve(FindAllFinancialsFromCompanyService);

        const financials = await findFinancials.execute({ company_id, page: Number(page) });

        return response.json(financials);
    }
}