import Employee from '../infra/typeorm/entities/Employee';
import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';

export default interface IEmployeesRepository {
    findById(id: string, company_id: string): Promise<Employee | undefined>;
    findAllEmployeesFromCompany(company_id: string, page: number): Promise<Employee[] | undefined>;
    findNewlyAddEmployees(company_id: string): Promise<Employee[] | undefined>;
    findEmployeeByName(company_id: string, name: string): Promise<Employee[] | undefined>;
    create(data: ICreateEmployeeDTO): Promise<Employee>;
    save(employee: Employee): Promise<Employee>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}