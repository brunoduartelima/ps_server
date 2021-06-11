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

    public async findById(id: string, shop_id: string): Promise<Client | undefined> {
        const client = await this.ormRepository.findOne(id, {
            relations: ['shops_clients'],
            where: { shop_id },
        });

        return client;
    }

    public async findAllClientsFromShop(shop_id: string, page: number): Promise<Client[] | undefined> {
        const clients = await this.ormRepository.find({
            relations: ['shops_clients'], 
            where: { shop_id }, 
            order: { name:'ASC' },
            take: 30,
            skip: (page - 1) * 30
        });

        return clients;
    }

    public async findNewlyAddClients(shop_id: string): Promise<Client[] | undefined> {
        const employees = await this.ormRepository.find({ 
            where: { shop_id }, 
            order: { created_at: 'DESC' },
            take: 15
        });

        return employees;
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

            const client_id = client.id;

            this.shopClientRepository.create({
                client_id, 
                shop_id
            });

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