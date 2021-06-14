import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';

interface IRequest {
    name: string;
    shop_id: string;
}

@injectable()
class FindClientByNameService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute({ shop_id, name }: IRequest): Promise<Client[]> {
        const clients = await this.clientsRepository.findClientByName(shop_id, name);

        if(!clients)
            throw new AppError('Clients not found');

        return clients;
    }

}

export default FindClientByNameService;