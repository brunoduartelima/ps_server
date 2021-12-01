import { getRepository, Repository } from 'typeorm';

import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';

import Sale from '../entities/Sale';

class SalesRepository implements ISalesRepository {
    private ormRepository: Repository<Sale>;

    constructor() {
        this.ormRepository = getRepository(Sale);
    }

    public async findById(id: string, company_id: string): Promise<Sale | undefined> {
        const sale = await this.ormRepository.findOne({ 
            where: { id, company_id }, 
            relations: [
                'sale_products', 
                'sale_products.product', 
                'sale_jobs', 
                'sale_jobs.job', 
                'sale_employees', 
                'sale_employees.employee',
                'customer'
            ]
        });

        return sale;
    }

    public async findAllSalesFromCompany(company_id: string, page: number): Promise<Sale[] | undefined> {
        const sales = await this.ormRepository.find({ 
            where: { company_id },
            relations: ['sale_products', 'sale_jobs', 'sale_employees', 'customer'],
            order: { created_at:'ASC' },
            take: 30,
            skip: (page - 1) * 30
        });

        return sales;
    }

    public async findNewlyAddSales(company_id: string): Promise<Sale[] | undefined> {
        const sales = await this.ormRepository.find({ 
            where: { company_id },
            relations: ['sale_products', 'sale_jobs', 'sale_employees', 'customer'],
            order: { created_at: 'DESC' },
            take: 15
        });

        return sales;
    }

    public async create({ 
        type, 
        description, 
        date, 
        company_id, 
        customer_id, 
        employees, 
        products, 
        jobs }: ICreateSaleDTO): Promise<Sale> {
        
        const sale = this.ormRepository.create({ 
            type, 
            description, 
            date, 
            company_id, 
            customer_id, 
            sale_employees: employees, 
            sale_products: products, 
            sale_jobs: jobs
         });

        await this.ormRepository.save(sale);

        return sale;
    }

    public async save(sale: Sale): Promise<Sale> {
        return await this.ormRepository.save(sale);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id)
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default SalesRepository;