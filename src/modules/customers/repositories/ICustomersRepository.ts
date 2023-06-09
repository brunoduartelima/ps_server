import Customer from '../infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomersRepository {
    findById(id: string, idCompany: string): Promise<Customer | undefined>;
    findAllCustomersFromCompany(idCompany: string, page: number): Promise<[Customer[], number] | undefined>;
    findNewlyAddCustomers(idCompany: string): Promise<Customer[] | undefined>;
    findCustomerByName(idCompany: string, name: string, page: number): Promise<[Customer[], number] | undefined>;
    findCustomerByCPF(idCompany: string, cpf: string): Promise<Customer | undefined>;
    create(data: ICreateCustomerDTO): Promise<Customer>;
    save(customer: Customer): Promise<Customer>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}