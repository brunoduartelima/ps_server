import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IShopsRepository from '../repositories/IShopsRepository';
import Shop from '@modules/shops/infra/typeorm/entities/Shop';

interface IRequest {
    name: string;
    company_type: string;
    uf: string;
    city: string;
    user_id: string;
}

@injectable()
class CreateShopService {
    constructor(
        @inject('ShopsRepository')
        private shopsRepository: IShopsRepository,
    ) {}

    public async execute({ name, company_type, uf, city, user_id }: IRequest): Promise<Shop> {
        const userOwnsShop = await this.shopsRepository.findShop(user_id);

        if (userOwnsShop)
            throw new AppError('User has a registered shop.')

        const shop = await this.shopsRepository.create({
            name,
            company_type,
            uf,
            city,
            user_id
        });

        return shop;
    }
}

export default CreateShopService;