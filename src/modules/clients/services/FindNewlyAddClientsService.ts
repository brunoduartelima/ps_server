import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';

interface IRequest {
    shop_id: string;
}

@injectable()
class FindNewlyAddClientsService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute({ shop_id }: IRequest): Promise<Client[]> {
        const clients = await this.clientsRepository.findNewlyAddClients(shop_id);

        if(!clients)
            throw new AppError('Clients not found');

        return clients;
    }

}

export default FindNewlyAddClientsService;