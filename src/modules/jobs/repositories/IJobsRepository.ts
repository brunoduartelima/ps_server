import Job from '../infra/typeorm/entities/Job';
import ICreateJobDTO from '../dtos/ICreateJobDTO';

export default interface IProductsRepository {
    findById(id: string, company_id: string): Promise<Job | undefined>;
    findAllJobsFromCompany(company_id: string, page: number): Promise<Job[] | undefined>;
    findNewlyAddJobs(company_id: string): Promise<Job[] | undefined>;
    findJobByName(company_id: string, name: string): Promise<Job[] | undefined>;
    findNameForControl(company_id: string, name: string): Promise<Job | undefined>;
    create(data: ICreateJobDTO): Promise<Job>;
    save(job: Job): Promise<Job>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}