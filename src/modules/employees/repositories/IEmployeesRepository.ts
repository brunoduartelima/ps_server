import Employee from '../infra/typeorm/entities/Employee';
import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';

interface IFindEmployees {
    id: string;
}

export default interface IEmployeesRepository {
    findById(id: string, company_id: string): Promise<Employee | undefined>;
    findAllById(employees: IFindEmployees[], company_id: string): Promise<Employee[]>;
    findAllEmployeesFromCompany(company_id: string, page: number): Promise<[Employee[], number] | undefined>;
    findNewlyAddEmployees(company_id: string): Promise<Employee[] | undefined>;
    findEmployeeByName(company_id: string, name: string, page: number): Promise<[Employee[], number] | undefined>;
    create(data: ICreateEmployeeDTO): Promise<Employee>;
    save(employee: Employee): Promise<Employee>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}