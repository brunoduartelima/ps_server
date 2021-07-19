import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindFinancialByTitleService from '@modules/financials/services/FindFinancialByTitleService';

export default class FindFinancialByTitleController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { title } = request.query;

        const findFinancials = container.resolve(FindFinancialByTitleService);

        const financials = await findFinancials.execute({ company_id, title: String(title) });

        return response.json(financials);
    }
}