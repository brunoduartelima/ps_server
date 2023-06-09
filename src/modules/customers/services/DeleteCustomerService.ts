import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../repositories/ICustomersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    idCompany: string;
}

@injectable()
class DeleteCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ id, idCompany }: IRequest): Promise<void> {
        const customer = await this.customersRepository.findById(id, idCompany);

        if(!customer)
            throw new AppError('Customer not found');

        await this.customersRepository.softDelete(id);
    }

}

export default DeleteCustomerService;