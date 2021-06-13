import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllClientsFromShopService from '@modules/clients/services/FindAllClientsFromShopService';

export default class FindAllClientsFromShopController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { page = 1 } = request.query;

        const findClients = container.resolve(FindAllClientsFromShopService);

        const clients = await findClients.execute({ shop_id, page: Number(page) });

        return response.json(clients);
    }
}