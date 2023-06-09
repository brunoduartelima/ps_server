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

    public async findById(id: string, idCompany: string): Promise<Customer | undefined> {
        const customer = await this.ormRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('companies_customers', 'company', 'company.idCustomer = customer.id')
        .where('company.company_id = :idCompany', { idCompany })
        .andWhere('customer.id = :id', { id })
        .getOne()

        return customer;
    }

    public async findAllCustomersFromCompany(idCompany: string, page: number): Promise<[Customer[], number] | undefined> {
        const customers = await this.ormRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('companies_customers', 'company', 'company.idCustomer = customer.id')
        .where('company.company_id = :idCompany', { idCompany })
        .orderBy('customer.name', 'ASC')
        .take(10)
        .skip((page - 1 )* 10)
        .getManyAndCount()

        return customers;
    }

    public async findNewlyAddCustomers(idCompany: string): Promise<Customer[] | undefined> {
        const customers = await this.ormRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('companies_customers', 'company', 'company.idCustomer = customer.id')
        .where('company.idCompany = :idCompany', { idCompany })
        .orderBy('customer.createdAt', 'DESC')
        .take(10)
        .getMany()

        return customers;
    }

    public async findCustomerByName(idCompany: string, name: string, page: number): Promise<[Customer[], number] | undefined> {
        const customers = await this.ormRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('companies_customers', 'company', 'company.idCustomer = customer.id')
        .where('company.company_id = :idCompany', { idCompany })
        .andWhere('customer.name ilike :name', { name: `%${name}%` })
        .orderBy('customer.name', 'ASC')
        .take(10)
        .skip((page - 1 )* 10)
        .getManyAndCount()

        return customers;
    }

    public async findCustomerByCPF(idCompany: string, cpf: string): Promise<Customer | undefined> {
        const customer = await this.ormRepository.createQueryBuilder('customer')
        .leftJoinAndSelect('companies_customers', 'company', 'company.idCustomer = customer.id')
        .where('customer.cpf = :cpf', { cpf })
        .andWhere('company.company_id = :idCompany', { idCompany })
        .getOne()

        return customer;
    }

    public async create({ 
        name, 
        cpf, 
        address, 
        addressNumber, 
        neighborhood, 
        cep, 
        sex, 
        phone, 
        dateBirth, 
        email, 
        idCompany }: ICreateCustomerDTO): Promise<Customer> {
            const customer = this.ormRepository.create({
                name, 
                cpf,
                address, 
                addressNumber, 
                neighborhood, 
                cep, 
                sex, 
                phone, 
                dateBirth, 
                email
            });

            const insertedId = await this.ormRepository.save(customer);

            const companies_customers = this.companyCustomerRepository.create({
                idCustomer: insertedId.id,
                idCompany
            });

            await this.companyCustomerRepository.save(companies_customers);

            return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        return await this.ormRepository.save(customer);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default CustomersRepository;