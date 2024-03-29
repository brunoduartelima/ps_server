import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    idCompany: string;
}

@injectable()
class FindCustomerDetailsService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ id, idCompany }: IRequest): Promise<Customer> {
        const customer = await this.customersRepository.findById(id, idCompany);

        if(!customer)
            throw new AppError('Customer not found');

        return customer;
    }

}

export default FindCustomerDetailsService;