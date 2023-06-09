import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindCustomerByNameService from '@modules/customers/services/FindCustomerByNameService';

export default class FindCustomerByNameController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { idCompany } = request.token;
        const { name, page = 1 } = request.query;

        const findCustomers = container.resolve(FindCustomerByNameService);

        const customers = await findCustomers.execute({ idCompany, name: String(name), page: Number(page) });

        return response.json(customers);

    }
}