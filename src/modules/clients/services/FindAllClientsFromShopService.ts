import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';

interface IRequest {
    shop_id: string;
    page: number;
}

@injectable()
class FindAllClientsFromShopService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute({ shop_id, page }: IRequest): Promise<Client[]> {
        const clients = await this.clientsRepository.findAllClientsFromShop(shop_id, page);

        if(!clients)
            throw new AppError('Client not found');

        return clients;
    }

}

export default FindAllClientsFromShopService;