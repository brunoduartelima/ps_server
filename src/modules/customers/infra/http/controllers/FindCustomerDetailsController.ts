import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindCustomerDetailsService from '@modules/customers/services/FindCustomerDetailsService';

export default class FindCustomerDetailsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { idCompany } = request.token;
        const { id } = request.params;

        const findCustomer = container.resolve(FindCustomerDetailsService);

        const customer = await findCustomer.execute({ idCompany, id });

        return response.json(customer);

    }
}