import ICreateSaleJobsDTO from "../dtos/ICreateSaleJobsDTO";
import ICreateSaleProductsDTO from "../dtos/ICreateSaleProductsDTO";
import ICreateSaleEmployeesDTO from "../dtos/ICreateSaleEmployeesDTO";

import SalesJobs from "../infra/typeorm/entities/SalesJobs";
import SalesProducts from "../infra/typeorm/entities/SalesProducts";
import SalesEmployees from "../infra/typeorm/entities/SalesEmployees";

export default interface ISalesRelationshipsRepository {
    createProducts(products: ICreateSaleProductsDTO): Promise<SalesProducts[]>;
    createJobs(jobs: ICreateSaleJobsDTO): Promise<SalesJobs[]>;
    createEmployees(employees: ICreateSaleEmployeesDTO): Promise<SalesEmployees[]>;
    deleteProducts(sale_id: string): Promise<void>;
    deleteJobs(sale_id: string): Promise<void>;
    deleteEmployees(sale_id: string): Promise<void>;
}