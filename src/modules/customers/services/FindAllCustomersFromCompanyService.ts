import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '../repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    idCompany: string;
    page: number;
}

@injectable()
class FindAllCustomersFromCompanyService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ idCompany, page }: IRequest): Promise<[Customer[], number]> {
        const customers = await this.customersRepository.findAllCustomersFromCompany(idCompany, page);

        if(!customers)
            throw new AppError('Customers not found');

        return customers;
    }

}

export default FindAllCustomersFromCompanyService;