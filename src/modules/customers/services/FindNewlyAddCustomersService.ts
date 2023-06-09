import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    idCompany: string;
}

@injectable()
class FindNewlyAddCustomersService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ idCompany }: IRequest): Promise<Customer[]> {
        const customers = await this.customersRepository.findNewlyAddCustomers(idCompany);

        if(!customers)
            throw new AppError('Customers not found');

        return customers;
    }

}

export default FindNewlyAddCustomersService;