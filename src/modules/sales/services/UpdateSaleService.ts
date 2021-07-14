import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISalesRepository from '../repositories/ISalesRepository';
import ISalesRelationshipsRepository from '../repositories/ISalesRelationshipsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import IJobsRepository from '@modules/jobs/repositories/IJobsRepository';

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
    id: string;
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
class UpdateSaleService {
    constructor(        
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,

        @inject('SalesRelationshipsRepository')
        private salesRelationshipsRepository: ISalesRelationshipsRepository,

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
        id,
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
        
        const sale = await this.salesRepository.findById(id, company_id);

        if(!sale)
            throw new AppError('Sale not found');
        
        if(customer_id) {
            var customerExists = await this.customersRepository.findById(String(customer_id), company_id);

            if(!customerExists)
                throw new AppError('Customer not found.');
        }
        // Validações sem alteração no banco
        let serializedProducts = undefined;
        let serializedJobs = undefined;
        let serializedEmployees = undefined;

        // 3 Casos para operações com Jobs
        // Caso 1: Tem jobs no DB e não tem jobs no body (apaga os do db)
        // Caso 2: Os jobs do DB são os mesmos do body (substitui)
        // Caso 3: Os jobs do DB são diferentes do body (apaga DB e cria novos) *tem banco
        if(sale.sale_jobs.length || (!sale.sale_jobs.length && jobs?.length)) {
            var jobsIds = sale.sale_jobs.map(job => ({
                id: job.job_id
            }));
        }

        if(jobs?.length) {
            const checkParityJobs = jobs.filter(
                job => !jobsIds.find(j => job.id == j.id)
            );
            //CASO 2 
            if(!checkParityJobs.length && jobs.length === sale.sale_jobs.length) {
                jobs.forEach(job => {
                    if(job.quantity < 0)
                    throw new AppError(
                        `The quantity is not available for ${jobs[0].id}`
                    );
                });

                sale.sale_jobs.forEach(
                    job => jobs.forEach(j => {
                        if(j.id === job.job_id){
                            job.price = j.price;
                            job.quantity = j.quantity;
                            job.descont = j.descont;
                        }
                    })
                );
            } else {// CASO 3
                const existentJobs = await this.jobsRepository.findAllById(
                    jobs,
                    company_id
                );
    
                if(!existentJobs.length)
                    throw new AppError('Could not find any jobs with the given ids');
    
                jobs.map(job => {
                    if(job.quantity <= 0 || !job.quantity)
                        throw new AppError('Invalid or empty job quantity.');
                });
    
                const existentJobsIds = existentJobs.map(job => job.id);
    
                const checkInexistentJobs = jobs.filter(
                    job => !existentJobsIds.includes(job.id),
                );
            
                if(checkInexistentJobs.length)
                    throw new AppError(`Could not find job ${checkInexistentJobs[0].id}`);
    
    
                serializedJobs = jobs.map(job => ({
                    sale_id: id,
                    job_id: job.id,
                    quantity: job.quantity,
                    descont: job.descont,
                    price: job.price,
                }));
            }
        }

        if(sale.sale_products.length) {
            const productsIds = sale.sale_products.map(product => ({
                id: product.product_id
            }));
    
            var checkParityProducts = products?.filter(
                product => !productsIds.find(p => product.id === p.id)
            );
    
            var referenceQuantityProducts = await this.productsRepository.findAllById(
                productsIds,
                company_id
            );
        }
        
        let reverseProductsQuantity = undefined;
        let orderedProductsQuantity = undefined;
        // 3 Casos para operações com Products
        // Caso 1: Tem products no DB e não tem products no body (apaga os do db)
        // Caso 2: Os products do DB são os mesmos do body (substitui) *tem banco
        // Caso 3: Os products do DB são diferentes do body (apaga DB e cria novos) *tem banco
        if(products?.length) {
            products.forEach(product => {
                if(product.quantity <= 0 || !product.quantity)
                    throw new AppError('Invalid or empty product quantity.');
            });
            // CASO 2
            // Operacao banco 
            // await this.productsRepository.updateQuantity(orderedProductsQuantity);
            if(!checkParityProducts?.length && products.length === sale.sale_products.length) {
                const differenceProductsQuantity = sale.sale_products.map(productDB => ({
                    id: productDB.product_id,
                    quantity: products
                        .filter(product => 
                            product.id === productDB.product_id)[0].quantity - productDB.quantity,
                }));

                orderedProductsQuantity = differenceProductsQuantity.map(product => ({
                    id: product.id,
                    quantity: referenceQuantityProducts
                        .filter(p => p.id === product.id)[0].quantity - product.quantity,
                }));

                orderedProductsQuantity.forEach(product => {
                    if(product.quantity < 0)
                        throw new AppError(`The quantity is not available for ${product.id}`);
                });

                sale.sale_products.forEach(
                    product => products.forEach(p => {
                        if(p.id == product.product_id){
                            product.price = p.price;
                            product.quantity = p.quantity;
                            product.descont = p.descont;
                        }
                    })
                );
            } else { //CASO 3 
                // Operacao banco
                // await this.salesRelationshipsRepository.deleteProducts(id);
                // await this.productsRepository.updateQuantity(orderedProductsQuantity);
                const existentProducts = await this.productsRepository.findAllById(
                    products,
                    company_id
                );
    
                if(!existentProducts.length)
                    throw new AppError('Could not find any products with the given ids');
    
                products.forEach(product => {
                    if(product.quantity <= 0 || !product.quantity)
                        throw new AppError('Invalid or empty product quantity.');
                });
    
                const existentProductsIds = existentProducts.map(product => product.id);
    
                const checkInexistentProducts = products.filter(
                    product => !existentProductsIds.includes(product.id),
                );
            
                if(checkInexistentProducts.length)
                    throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);

                if(sale.sale_products.length) {
                    reverseProductsQuantity = sale.sale_products.map(product => ({
                        id: product.product_id,
                        quantity: referenceQuantityProducts
                            .filter(p => p.id === product.product_id)[0].quantity + product.quantity,
                    }));
                }

                orderedProductsQuantity = products.map(product => ({
                    id: product.id,
                    quantity: existentProducts
                        .filter(p => p.id === product.id)[0].quantity - product.quantity,
                }));

                const findProductsWithNoQuantityAvailable = products.filter(
                    product =>
                        existentProducts.filter(p => p.id === product.id)[0].quantity < product.quantity,
                );
                
                if(findProductsWithNoQuantityAvailable.length)
                    throw new AppError(
                        `The quantity ${findProductsWithNoQuantityAvailable[0].quantity} is not available for ${findProductsWithNoQuantityAvailable[0].id}`
                    );
    
                serializedProducts = products.map(product => ({
                    sale_id: id,
                    product_id: product.id,
                    quantity: product.quantity,
                    descont: product.descont,
                    price: product.price,
                }));

            }

        }
        
        // 2 Casos para operações com Employees
        // Caso 1: Os employees do DB são os mesmos do body (substitui)
        // Caso 2: Os employees do DB são diferentes do body (apaga DB e cria novos) *tem banco
        const employeesIds = sale.sale_employees.map(employee => ({
            id: employee.employee_id
        }));
        
        const checkParityEmployees = employees.filter(
            employee => !employeesIds.find(e => employee.id == e.id)
        );
        // CASO 1
        if(!checkParityEmployees.length && employees.length === sale.sale_employees.length) {
            sale.sale_employees.forEach(
                employee => employees.forEach(e => {
                    if(e.id === employee.id){
                        employee.commission = e.commission;
                    }
                })
            );
        } else { // CASO 2
            const existentEmployees = await this.employeesRepository.findAllById(
                employees,
                company_id
            );

            if(!existentEmployees.length)
                throw new AppError('Could not find any employees with the given ids');

            const existentEmployeesIds = existentEmployees.map(employee => {
                if(employee.active !== true)
                    throw new AppError(`Employee ${employee.id} is disabled, cannot participate in the sale.`);
                
                return employee.id;
            });

            const checkInexistentEmployees = employees.filter(
                employee => !existentEmployeesIds.includes(employee.id),
            );
        
            if(checkInexistentEmployees.length)
            throw new AppError(`Could not find employee ${checkInexistentEmployees[0].id}`);

            serializedEmployees = employees.map(employee => ({
                sale_id: id,
                employee_id: employee.id,
                commission: employee.commission,
            }));
        }
        
        sale.type = type;
        sale.description = description;
        sale.date = date;
        

        if(customerExists) {
            sale.customer_id = customer_id;
            sale.customer = customerExists;
        } else {
            sale.customer_id = customer_id;
            delete sale.customer;
        }
        
        if(serializedJobs) {
            await this.salesRelationshipsRepository.deleteJobs(id);

            const saleJobs = await this.salesRelationshipsRepository.createJobs({
                jobs: serializedJobs
            });
            
            sale.sale_jobs = saleJobs;
        }

        if(serializedEmployees) {
            await this.salesRelationshipsRepository.deleteEmployees(id);

            const saleEmployees = await this.salesRelationshipsRepository.createEmployees({
                employees: serializedEmployees
            });
            
            sale.sale_employees = saleEmployees;
        }

        if(!checkParityProducts?.length && products?.length === sale.sale_products.length && orderedProductsQuantity)
            await this.productsRepository.updateQuantity(orderedProductsQuantity);
        
        if(serializedProducts && orderedProductsQuantity) {
            if(reverseProductsQuantity) {
                await this.productsRepository.updateQuantity(reverseProductsQuantity);
                await this.salesRelationshipsRepository.deleteProducts(id);
            }

            await this.productsRepository.updateQuantity(orderedProductsQuantity);
            
            const saleProducts = await this.salesRelationshipsRepository.createProducts({
                products: serializedProducts
            });
            
            sale.sale_products = saleProducts;
        }
        
        await this.salesRepository.save(sale);
        
        if(sale.sale_jobs.length && !jobs?.length)
            await this.salesRelationshipsRepository.deleteJobs(id);

        if(sale.sale_products.length && !products?.length) {
            await this.salesRelationshipsRepository.deleteProducts(id);

            const orderedProductsQuantity = sale.sale_products.map(product => ({
                id: product.product_id,
                quantity: referenceQuantityProducts
                    .filter(p => p.id === product.product_id)[0].quantity + product.quantity,
            }));
        
            await this.productsRepository.updateQuantity(orderedProductsQuantity);
        }
        
        const returnSale = await this.salesRepository.findById(id, company_id);

        if(!returnSale)
            throw new AppError('Update Sale error');
        
        return returnSale;
    }

}

export default UpdateSaleService;