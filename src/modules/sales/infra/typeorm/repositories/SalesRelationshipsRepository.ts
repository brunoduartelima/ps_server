import { getConnection, getRepository, Repository, Transaction } from 'typeorm';

import ISalesRelationshipsRepository from '@modules/sales/repositories/ISalesRelationshipsRepository';
import ICreateSaleJobsDTO from "@modules/sales/dtos/ICreateSaleJobsDTO";
import ICreateSaleProductsDTO from "@modules/sales/dtos/ICreateSaleProductsDTO";
import ICreateSaleEmployeesDTO from "@modules/sales/dtos/ICreateSaleEmployeesDTO";

import SalesEmployees from '../entities/SalesEmployees';
import SalesJobs from '../entities/SalesJobs';
import SalesProducts from '../entities/SalesProducts';

class SalesRelationshipsRepository implements ISalesRelationshipsRepository {
    private ormSalesEmployeesRepository: Repository<SalesEmployees>;
    private ormSalesJobsRepository: Repository<SalesJobs>;
    private ormSalesProductsRepository: Repository<SalesProducts>;

    constructor() {
        this.ormSalesEmployeesRepository = getRepository(SalesEmployees);
        this.ormSalesJobsRepository = getRepository(SalesJobs);
        this.ormSalesProductsRepository = getRepository(SalesProducts);
    }

    public async createProducts({ products }: ICreateSaleProductsDTO): Promise<SalesProducts[]> {
        const saleProducts = this.ormSalesProductsRepository.create(products);

        await this.ormSalesProductsRepository.save(saleProducts);

        return saleProducts;
    }

    public async createJobs({ jobs }: ICreateSaleJobsDTO): Promise<SalesJobs[]> {
        const saleJobs = this.ormSalesJobsRepository.create(jobs);

        await this.ormSalesJobsRepository.save(saleJobs);

        return saleJobs;
    }

    public async createEmployees({ employees }: ICreateSaleEmployeesDTO): Promise<SalesEmployees[]> {
        const saleEmployees = this.ormSalesEmployeesRepository.create(employees);

        await this.ormSalesEmployeesRepository.save(saleEmployees);

        return saleEmployees;
    }

    public async deleteProducts(sale_id: string): Promise<void> {
        const products = await this.ormSalesProductsRepository.find({sale_id});
        await this.ormSalesProductsRepository.remove(products);
    }

    public async deleteJobs(sale_id: string): Promise<void> {
        const jobs = await this.ormSalesJobsRepository.find({sale_id});
        await this.ormSalesJobsRepository.remove(jobs);
    }

    public async deleteEmployees(sale_id: string): Promise<void> {
        const employees = await this.ormSalesEmployeesRepository.find({sale_id});
        await this.ormSalesEmployeesRepository.remove(employees);
    }

}

export default SalesRelationshipsRepository;