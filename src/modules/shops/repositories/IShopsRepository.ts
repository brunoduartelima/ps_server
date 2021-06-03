import Shop from '../infra/typeorm/entities/Shop';
import ICreateShopDTO from '../dtos/ICreateShopDTO';

export default interface IShopsRepository {
    findById(id: string): Promise<Shop | undefined>;
    findShop(user_id: string): Promise<Shop | undefined>;
    create(data: ICreateShopDTO): Promise<Shop>;
    save(shop: Shop): Promise<Shop>;
}