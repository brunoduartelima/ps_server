import Service from '../infra/typeorm/entities/Service';
import ICreateServiceDTO from '../dtos/ICreateServiceDTO';

export default interface IProductsRepository {
    findById(id: string, shop_id: string): Promise<Service | undefined>;
    findAllServicesFromShop(shop_id: string, page: number): Promise<Service[] | undefined>;
    findNewlyAddServices(shop_id: string): Promise<Service[] | undefined>;
    findServiceByName(shop_id: string, name: string): Promise<Service[] | undefined>;
    findNameForControl(shop_id: string, name: string): Promise<Service | undefined>;
    create(data: ICreateServiceDTO): Promise<Service>;
    save(Service: Service): Promise<Service>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}