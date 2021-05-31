import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IShopsRepository from '../repositories/IShopsRepository';

import Shop from '@modules/shops/infra/typeorm/entities/Shop';

interface IRequest {
    name: string;
    company_type: string;
    uf: string;
    city: string;
    shop_id: string;
}

@injectable()
class UpdateShopService {
    constructor(
        @inject('ShopsRepository')
        private shopsRepository: IShopsRepository,
    ) {}

    public async execute({ name, company_type, uf, city, shop_id }: IRequest): Promise<Shop> {
        const shop = await this.shopsRepository.findById(shop_id);

        if (!shop)
            throw new AppError('Shop not found');
        
        shop.name = name;
        shop.company_type = company_type;
        shop.uf = uf;
        shop.city = city;

        await this.shopsRepository.save(shop);

        return shop;
    }
}

export default UpdateShopService;