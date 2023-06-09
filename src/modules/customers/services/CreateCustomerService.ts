import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../repositories/ICustomersRepository';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    cpf: string;
    address: string;
    addressNumber: string;
    neighborhood: string;
    cep: string;
    sex: string;
    phone: string;
    dateBirth: Date;
    email?: string;
    idCompany: string;
}

@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute(data: IRequest): Promise<Customer> {
        const controlCustomerCpf = await this.customersRepository.findCustomerByCPF(data.idCompany, data.cpf);

        if(controlCustomerCpf)
            throw new AppError('This CPF is already being used.');
        
        const customer = await this.customersRepository.create(data);

        return customer;
    }

}

export default CreateCustomerService;