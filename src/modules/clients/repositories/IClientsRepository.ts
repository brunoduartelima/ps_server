import Client from '../infra/typeorm/entities/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

export default interface IClientsRepository {
    findById(id: string): Promise<Client | undefined>;
    findAllClientsFromShop(shop_id: string, page: number): Promise<Client[] | undefined>;
    findNewlyAddClients(shop_id: string): Promise<Client[] | undefined>;
    findClientByName(shop_id: string, name: string): Promise<Client[] | undefined>;
    findClientByCPF(shop_id: string, cpf: string): Promise<Client | undefined>;
    create(data: ICreateClientDTO): Promise<Client>;
    save(Client: Client): Promise<Client>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}