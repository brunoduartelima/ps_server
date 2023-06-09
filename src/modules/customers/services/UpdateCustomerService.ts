import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '../repositories/ICustomersRepository';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
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
class UpdateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute(data: IRequest): Promise<Customer> {
        const customer = await this.customersRepository.findById(data.id, data.idCompany);

        if(!customer)
            throw new AppError('Customer not found');

        if(customer.cpf !== data.cpf) {
            const controlCustomerCpf = await this.customersRepository.findCustomerByCPF(
                data.idCompany, 
                data.cpf
            );

            if(controlCustomerCpf)
                throw new AppError('This CPF is already being used.');
        }
    
        if(customer.deletedAt !== null)
            throw new AppError('Customer deleted, operation not permitted');

        customer.name = data.name;
        customer.cpf = data.cpf;
        customer.address = data.address;
        customer.addressNumber = data.addressNumber;
        customer.neighborhood = data.neighborhood;
        customer.cep = data.cep;
        customer.sex = data.sex;
        customer.phone = data.phone;
        customer.dateBirth = data.dateBirth;
        customer.email = data.email;

        return this.customersRepository.save(customer);
    }

}

export default UpdateCustomerService;