import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShopsRepository from '../repositories/IShopsRepository';
import Shop from '@modules/shops/infra/typeorm/entities/Shop';

interface IRequest {
    shop_id: string;
}

@injectable()
class ShowShopService {
    constructor(
        @inject('ShopsRepository')
        private shopsRepository: IShopsRepository,
    ) {}

    public async execute({ shop_id }: IRequest): Promise<Shop> {
        const shop = await this.shopsRepository.findById(shop_id);

        if (!shop)
            throw new AppError('Shop not found');

        return shop;
    }
}

export default ShowShopService;