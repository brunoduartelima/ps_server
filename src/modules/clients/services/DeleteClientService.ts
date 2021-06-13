import { inject, injectable } from 'tsyringe';

import IClientsRepository from '../repositories/IClientsRepository';

import AppError from '@shared/errors/AppError';
import { typeInfo } from 'tsyringe/dist/typings/dependency-container';

interface IRequest {
    id: string;
    shop_id: string;
}

@injectable()
class DeleteClientService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute({ id, shop_id }: IRequest): Promise<void> {
        const client = await this.clientsRepository.findById(id);

        if(!client)
            throw new AppError('Client not found');

        if(shop_id !== client.shop_clients[0].shop_id)
            throw new AppError('Client does not belong to that shop');

        await this.clientsRepository.softDelete(id);
    }

}

export default DeleteClientService;