import { getRepository, Repository } from 'typeorm';

import IShopsRepository from '@modules/shops/repositories/IShopsRepository';

import Shop from '../entities/Shop';
import ICreateShopDTO from '@modules/shops/dtos/ICreateShopDTO';

class ShopsRepository implements IShopsRepository {
    private ormRepository: Repository<Shop>

    constructor() {
        this.ormRepository = getRepository(Shop);
    }

    public async findById(id: string): Promise<Shop | undefined> {
        const shop = await this.ormRepository.findOne(id);

        return shop;
    }

    public async create({ name, company_type, uf, city  }: ICreateShopDTO): Promise<Shop> {
        const shop = this.ormRepository.create({ name, company_type, uf, city });

        await this.ormRepository.save(shop);

        return shop;
    }

    public async save(shop: Shop): Promise<Shop> {
        return this.ormRepository.save(shop);
    }
}

export default ShopsRepository;