import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindCustomerByNameService from '@modules/customers/services/FindCustomerByNameService';

export default class FindCustomerByNameController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { name } = request.query;

        const findCustomers = container.resolve(FindCustomerByNameService);

        const customers = await findCustomers.execute({ company_id, name: String(name) });

        return response.json(customers);

    }
}