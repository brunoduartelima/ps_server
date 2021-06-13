import { getRepository, Repository, ILike } from 'typeorm';

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

    public async findById(id: string): Promise<Client | undefined> {
        const client = await this.ormRepository.findOne({
            relations: ['shop_clients'],
            where: { id },
            withDeleted: true
        });

        return client;
    }

    public async findAllClientsFromShop(shop_id: string, page: number): Promise<Client[] | undefined> {
        const getIdsClients = await this.shopClientRepository.find({
            where: { shop_id },
        });

        const ids = getIdsClients.map(client =>(
            client.client_id
        ));

        const clients = await this.ormRepository.findByIds(ids, { 
            order: { name:'ASC' },
            take: 30,
            skip: (page - 1) * 30
        });

        return clients;
    }

    public async findNewlyAddClients(shop_id: string): Promise<Client[] | undefined> {
        const getIdsClients = await this.shopClientRepository.find({
            where: { shop_id },
            order: { created_at: 'DESC' },
            take: 15
        });

        const ids = getIdsClients.map(client =>(
            client.client_id
        ));

        const clients = await this.ormRepository.findByIds(ids, {
            order: { created_at: 'DESC' },
        });

        return clients;
    }

    public async findClientByName(shop_id: string, name: string): Promise<Client[] | undefined> {
        const employees = this.ormRepository.find({
            where: {
                shop_id,
                name: ILike(`%${name}%`)
            },
            order: { name: 'ASC'}
        });

        return employees;
    }

    public async findClientByCPF(shop_id: string, cpf: string): Promise<Client | undefined> {
        const client = this.ormRepository.findOne({
            relations: ['shops_clients'],
            where: { shop_id, cpf }
        });

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