import { inject, injectable } from 'tsyringe';

import IClientsRepository from '../repositories/IClientsRepository';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    name: string;
    cpf: string;
    address: string;
    address_number: string;
    neighborhood: string;
    cep: string;
    sex: string;
    phone: string;
    date_birth: Date;
    email?: string;
    shop_id: string;
}

@injectable()
class UpdateClientService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute(data: IRequest): Promise<Client> {
        const client = await this.clientsRepository.findById(data.id);

        if(!client)
            throw new AppError('Client not found');
        
        if(data.shop_id !== client.shop_clients[0].shop_id)
            throw new AppError('Client does not belong to that shop');
    
        if(client.deleted_at !== null)
            throw new AppError('Client deleted, operation not permitted');

        client.name = data.name;
        client.cpf = data.cpf;
        client.address = data.address;
        client.address_number = data.address_number;
        client.neighborhood = data.neighborhood;
        client.cep = data.cep;
        client.sex = data.sex;
        client.phone = data.phone;
        client.date_birth = data.date_birth;
        client.email = data.email;

        return this.clientsRepository.save(client);
    }

}

export default UpdateClientService;