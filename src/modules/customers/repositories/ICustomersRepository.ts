import Customer from '../infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomersRepository {
    findById(id: string, company_id: string): Promise<Customer | undefined>;
    findAllCustomersFromCompany(company_id: string, page: number): Promise<Customer[] | undefined>;
    findNewlyAddCustomers(company_id: string): Promise<Customer[] | undefined>;
    findCustomerByName(company_id: string, name: string): Promise<Customer[] | undefined>;
    findCustomerByCPF(company_id: string, cpf: string): Promise<Customer | undefined>;
    create(data: ICreateCustomerDTO): Promise<Customer>;
    save(customer: Customer): Promise<Customer>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}