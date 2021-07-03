import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllCustomersFromCompanyService from '@modules/customers/services/FindAllCustomersFromCompanyService';

export default class FindAllCustomersFromCompanyController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { page = 1 } = request.query;

        const findCustomers = container.resolve(FindAllCustomersFromCompanyService);

        const customers = await findCustomers.execute({ company_id, page: Number(page) });

        return response.json(customers);
    }
}