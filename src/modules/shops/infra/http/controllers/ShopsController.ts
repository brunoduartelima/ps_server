 import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateShopService from '@modules/shops/services/CreateShopService';
import UpdateShopService from '@modules/shops/services/UpdateShopService';
import ShowShopService from '@modules/shops/services/ShowShopService';

export default class ShopsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;

        const showShop = container.resolve(ShowShopService);

        const shop = await showShop.execute({ shop_id });

        return response.json(shop);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params;
        const { name, company_type, uf, city } = request.body;

        const createShop = container.resolve(CreateShopService);
    
        const shop = await createShop.execute({
            name, 
            company_type, 
            uf, 
            city, 
            user_id
        });
    
        return response.json(shop);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { name, company_type, uf, city } = request.body;

        const updateShop = container.resolve(UpdateShopService);
    
        const shop = await updateShop.execute({
            name, 
            company_type,
            uf, 
            city, 
            shop_id
        });
    
        return response.json(shop);
    }
}