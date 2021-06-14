import { inject, injectable } from 'tsyringe';

import IClientsRepository from '../repositories/IClientsRepository';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';

interface IRequest {
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
class CreateClientService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute(data: IRequest): Promise<Client> {
        const controlClientCpf = await this.clientsRepository.findClientByCPF(data.shop_id, data.cpf);

        if(controlClientCpf)
            throw new AppError('This CPF is already being used.');
        
        const client = await this.clientsRepository.create(data);

        return client;
    }

}

export default CreateClientService;