import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    company_id: string;
    page: number;
}

@injectable()
class FindAllCustomersFromCompanyService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ company_id, page }: IRequest): Promise<Customer[]> {
        const customers = await this.customersRepository.findAllCustomersFromCompany(company_id, page);

        if(!customers)
            throw new AppError('Customers not found');

        return customers;
    }

}

export default FindAllCustomersFromCompanyService;