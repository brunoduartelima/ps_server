import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindClientByNameService from '@modules/clients/services/FindClientByNameService';

export default class FindEmployeeByNameController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { name } = request.query;

        const findClients = container.resolve(FindClientByNameService);

        const clients = await findClients.execute({ shop_id, name: String(name) });

        return response.json(clients);

    }
}