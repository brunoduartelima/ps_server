import { getRepository, Repository } from 'typeorm';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';

import Client from '../entities/Client';
import ShopsClients from '@modules/shops/infra/typeorm/entities/ShopsClients';

class ClientsRepository implements IClientsRepository {
    private ormRepository: Repository<Client>;
    private shopClientRepository: Repository<ShopsClients>;

    constructor() {
        this.ormRepository = getRepository(Client);
        this.shopClientRepository = getRepository(ShopsClients);
    }

    public async findById(id: string, shop_id: string): Promise<Client | undefined> {
        const client = await this.ormRepository.createQueryBuilder('client')
        .leftJoinAndSelect('shops_clients', 'shop', 'shop.client_id = client.id')
        .where('shop.shop_id = :shop_id', { shop_id })
        .andWhere('client.id = :id', { id })
        .getOne()

        return client;
    }

    public async findAllClientsFromShop(shop_id: string, page: number): Promise<Client[] | undefined> {
        const clients = await this.ormRepository.createQueryBuilder('client')
        .leftJoinAndSelect('shops_clients', 'shop', 'shop.client_id = client.id')
        .where('shop.shop_id = :shop_id', { shop_id })
        .orderBy('client.name', 'ASC')
        .take(30)
        .skip((page - 1 )* 30)
        .getMany()

        return clients;
    }

    public async findNewlyAddClients(shop_id: string): Promise<Client[] | undefined> {
        const clients = await this.ormRepository.createQueryBuilder('client')
        .leftJoinAndSelect('shops_clients', 'shop', 'shop.client_id = client.id')
        .where('shop.shop_id = :shop_id', { shop_id })
        .orderBy('client.created_at', 'DESC')
        .take(15)
        .getMany()

        return clients;
    }

    public async findClientByName(shop_id: string, name: string): Promise<Client[] | undefined> {
        const clients = await this.ormRepository.createQueryBuilder('client')
        .leftJoinAndSelect('shops_clients', 'shop', 'shop.client_id = client.id')
        .where('client.name ilike :name', { name: `%${name}%` })
        .andWhere('shop.shop_id = :shop_id', { shop_id })
        .orderBy({ name: 'ASC' })
        .getMany()

        return clients;
    }

    public async findClientByCPF(shop_id: string, cpf: string): Promise<Client | undefined> {
        const client = await this.ormRepository.createQueryBuilder('client')
        .leftJoinAndSelect('shops_clients', 'shop', 'shop.client_id = client.id')
        .where('client.cpf = :cpf', { cpf })
        .andWhere('shop.shop_id = :shop_id', { shop_id })
        .getOne()

        return client;
    }

    public async create({ 
        name, 
        cpf, 
        address, 
        address_number, 
        neighborhood, 
        cep, 
        sex, 
        phone, 
        date_birth, 
        email, 
        shop_id }: ICreateClientDTO): Promise<Client> {
            const client = this.ormRepository.create({
                name, 
                cpf,
                address, 
                address_number, 
                neighborhood, 
                cep, 
                sex, 
                phone, 
                date_birth, 
                email
            });

            const insertedId = await this.ormRepository.save(client);

            const shops_clients = this.shopClientRepository.create({
                client_id: insertedId.id,
                shop_id
            });

            await this.shopClientRepository.save(shops_clients);

            return client;
    }

    public async save(client: Client): Promise<Client> {
        return this.ormRepository.save(client);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default ClientsRepository;