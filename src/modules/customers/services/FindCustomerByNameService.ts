import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    name: string;
    company_id: string;
}

@injectable()
class FindCustomerByNameService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ company_id, name }: IRequest): Promise<Customer[]> {
        const customers = await this.customersRepository.findCustomerByName(company_id, name);

        if(!customers)
            throw new AppError('Customers not found');

        return customers;
    }

}

export default FindCustomerByNameService;