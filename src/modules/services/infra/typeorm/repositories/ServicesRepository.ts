import { getRepository, Repository, ILike } from 'typeorm';

import IServicesRepository from '@modules/services/repositories/IServicesRepository';
import ICreateServiceDTO from '@modules/services/dtos/ICreateServiceDTO';

import Service from '../entities/Service';

class ServicesRepository implements IServicesRepository {
    private ormRepository: Repository<Service>;

    constructor() {
        this.ormRepository = getRepository(Service);
    }

    public async findById(id: string, shop_id: string): Promise<Service | undefined> {
        const service = await this.ormRepository.findOne({ where: { id, shop_id }, withDeleted: true });

        return service;
    }

    public async findAllServicesFromShop(shop_id: string, page: number): Promise<Service[] | undefined> {
        const services = await this.ormRepository.find({ 
            where: { shop_id }, 
            order: { name:'ASC' },
            take: 30,
            skip: (page - 1) * 30
        });

        return services;
    }

    public async findNewlyAddServices(shop_id: string): Promise<Service[] | undefined> {
        const services = await this.ormRepository.find({ 
            where: { shop_id }, 
            order: { created_at: 'DESC' },
            take: 15
        });

        return services;
    }

    public async findServiceByName(shop_id: string, name: string): Promise<Service[] | undefined> {
        const services = this.ormRepository.find({
            where: {
                shop_id,
                name: ILike(`%${name}%`)
            },
            order: { name: 'ASC'}
        });

        return services;
    }

    public async findNameForControl(shop_id: string, name: string): Promise<Service | undefined> {
        const service = await this.ormRepository.findOne({
            where: { name, shop_id }
        });

        return service;
    }

    public async create({ name, description, price, average_time, shop_id }: ICreateServiceDTO): Promise<Service> {
        const service = this.ormRepository.create({ name, description, price, average_time, shop_id });

        await this.ormRepository.save(service);

        return service;
    }

    public async save(service: Service): Promise<Service> {
        return this.ormRepository.save(service);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default ServicesRepository;