import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    name: string;
    page: number;
    idCompany: string;
}

@injectable()
class FindCustomerByNameService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ idCompany, name, page }: IRequest): Promise<[Customer[], number]> {
        const customers = await this.customersRepository.findCustomerByName(idCompany, name, page);

        if(!customers)
            throw new AppError('Customers not found');

        return customers;
    }

}

export default FindCustomerByNameService;