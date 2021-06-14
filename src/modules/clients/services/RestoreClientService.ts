import { inject, injectable } from 'tsyringe';

import IClientsRepository from '../repositories/IClientsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    shop_id: string;
}

@injectable()
class RestoreClientService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository,
    ) {}

    public async execute({ id, shop_id }: IRequest): Promise<void> {
        const client = await this.clientsRepository.findById(id, shop_id);

        if(!client)
            throw new AppError('Client not found');

        await this.clientsRepository.restore(id);
    }

}

export default RestoreClientService;