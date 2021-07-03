import { getRepository, Repository } from 'typeorm';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

import Customer from '../entities/Customer';
import CompaniesCustomers from '@modules/companies/infra/typeorm/entities/CompaniesCustomers';

class CustomersRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;
    private companyCustomerRepository: Repository<CompaniesCustomers>;

    constructor() {
        this.ormRepository = getRepository(Customer);
        this.companyCustomerRepository = getRepository(CompaniesCustomers);
    }

    public async findById(id: string, company_id: string): Promise<Customer | undefined> {
        const customer = await this.ormRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('companies_customers', 'company', 'company.customer_id = customer.id')
        .where('company.company_id = :company_id', { company_id })
        .andWhere('customer.id = :id', { id })
        .getOne()

        return customer;
    }

    public async findAllCustomersFromCompany(company_id: string, page: number): Promise<Customer[] | undefined> {
        const customers = await this.ormRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('companies_customers', 'company', 'company.customer_id = customer.id')
        .where('company.company_id = :company_id', { company_id })
        .orderBy('customer.name', 'ASC')
        .take(30)
        .skip((page - 1 )* 30)
        .getMany()

        return customers;
    }

    public async findNewlyAddCustomers(company_id: string): Promise<Customer[] | undefined> {
        const customers = await this.ormRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('companies_customers', 'company', 'company.customer_id = customer.id')
        .where('company.company_id = :company_id', { company_id })
        .orderBy('customer.created_at', 'DESC')
        .take(15)
        .getMany()

        return customers;
    }

    public async findCustomerByName(company_id: string, name: string): Promise<Customer[] | undefined> {
        const customers = await this.ormRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('companies_customers', 'company', 'company.customer_id = customer.id')
        .where('customer.name ilike :name', { name: `%${name}%` })
        .andWhere('company.company_id = :company_id', { company_id })
        .orderBy({ name: 'ASC' })
        .getMany()

        return customers;
    }

    public async findCustomerByCPF(company_id: string, cpf: string): Promise<Customer | undefined> {
        const customer = await this.ormRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('companies_customers', 'company', 'company.customer_id = customer.id')
        .where('customer.cpf = :cpf', { cpf })
        .andWhere('company.company_id = :company_id', { company_id })
        .getOne()

        return customer;
    }

    public async create({ 
        name, 
        cpf, 
        address, 
        address_number, 
        neighborhood, 
        cep, 
        sex, 
        phone, 
        date_birth, 
        email, 
        company_id }: ICreateCustomerDTO): Promise<Customer> {
            const customer = this.ormRepository.create({
                name, 
                cpf,
                address, 
                address_number, 
                neighborhood, 
                cep, 
                sex, 
                phone, 
                date_birth, 
                email
            });

            const insertedId = await this.ormRepository.save(customer);

            const companies_customers = this.companyCustomerRepository.create({
                customer_id: insertedId.id,
                company_id
            });

            await this.companyCustomerRepository.save(companies_customers);

            return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        return this.ormRepository.save(customer);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default CustomersRepository;