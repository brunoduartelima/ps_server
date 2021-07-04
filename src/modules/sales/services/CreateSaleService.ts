import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import IJobsRepository from '@modules/jobs/repositories/IJobsRepository';
import ISalesRepository from '../repositories/ISalesRepository';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';

interface IProduct {
    id: string;
    price: number;
    descont?: number;
    quantity: number;
}

interface IJob {
    id: string;
    price: number;
    descont?: number;
    quantity: number;
}

interface IEmployee {
    id: string;
    commission?: number;
}

interface IRequest {
    type: string;
    description?: string;
    date: Date;
    company_id: string;
    employees: IEmployee[];
    customer_id?: string;
    products?: IProduct[];
    jobs?: IJob[];
}

@injectable()
class CreateSaleService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,

        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('JobsRepository')
        private jobsRepository: IJobsRepository,

        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,

        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

    ) {}

    public async execute({ 
        type, 
        description, 
        date, 
        company_id, 
        customer_id, 
        employees, 
        products, 
        jobs }: IRequest): Promise<Sale> {
        
        if(!products?.length && !jobs?.length)
            throw new AppError('No products or services have been shipped for sale.');
        
        if(!employees.length)
            throw new AppError('Sale cannot be made without an employee.');
        
        if(customer_id) {
            const customerExists = await this.customersRepository.findById(String(customer_id), company_id);

            if(!customerExists)
                throw new AppError('Customer not found.');
        }
        
        let serializedProducts = undefined;
        let serializedJobs = undefined;

        if(products?.length) {
            const existentProducts = await this.productsRepository.findAllById(
                products,
                company_id
            );

            if(!existentProducts.length)
                throw new AppError('Could not find any products with the given ids');

            const existentProductsIds = existentProducts.map(product => product.id);

            const checkInexistentProducts = products.filter(
                product => !existentProductsIds.includes(product.id),
            );
        
            if(checkInexistentProducts.length)
                throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);

            const findProductsWithNoQuantityAvailable = products.filter(
                product =>
                existentProducts.filter(p => p.id === product.id)[0].quantity < product.quantity,
            );
            
            if(findProductsWithNoQuantityAvailable.length)
                throw new AppError(
                    `The quantity ${findProductsWithNoQuantityAvailable[0].quantity} is not available for ${findProductsWithNoQuantityAvailable[0].id}`
                );

            serializedProducts = products.map(product => ({
                product_id: product.id,
                quantity: product.quantity,
                descont: product.descont,
                price: product.price,
            }));
        }

        if(jobs?.length) {
            const existentJobs = await this.jobsRepository.findAllById(
                jobs,
                company_id
            );

            if(!existentJobs.length)
                throw new AppError('Could not find any jobs with the given ids');

            const existentJobsIds = existentJobs.map(job => job.id);

            const checkInexistentJobs = jobs.filter(
                job => !existentJobsIds.includes(job.id),
            );
        
            if(checkInexistentJobs.length)
                throw new AppError(`Could not find job ${checkInexistentJobs[0].id}`);


            serializedJobs = jobs.map(job => ({
                job_id: job.id,
                quantity: job.quantity,
                descont: job.descont,
                price: job.price,
            }));
        }

        
        const existentEmployees = await this.employeesRepository.findAllById(
            employees,
            company_id
        );

        if(!existentEmployees.length)
            throw new AppError('Could not find any employees with the given ids');

        const existentEmployeesIds = existentEmployees.map(employee => employee.id);

        const checkInexistentEmployees = employees.filter(
            employee => !existentEmployeesIds.includes(employee.id),
        );
    
        if(checkInexistentEmployees.length)
            throw new AppError(`Could not find employee ${checkInexistentEmployees[0].id}`);

        const serializedEmployees = employees.map(employee => ({
            employee_id: employee.id,
            commission: employee.commission,
        }));

        const sale = await this.salesRepository.create({
            type, 
            description, 
            date, 
            company_id, 
            customer_id, 
            employees: serializedEmployees,
            products: serializedProducts,
            jobs: serializedJobs
        });

        return sale;
    }

}

export default CreateSaleService;