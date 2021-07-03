import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    company_id: string;
}

@injectable()
class FindNewlyAddCustomersService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<Customer[]> {
        const customers = await this.customersRepository.findNewlyAddCustomers(company_id);

        if(!customers)
            throw new AppError('Customers not found');

        return customers;
    }

}

export default FindNewlyAddCustomersService;