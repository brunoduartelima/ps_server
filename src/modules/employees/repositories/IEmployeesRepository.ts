import Employee from '../infra/typeorm/entities/Employee';
import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';

export default interface IEmployeesRepository {
    findById(id: string): Promise<Employee | undefined>;
    findAllEmployeesFromShop(shop_id: string): Promise<Employee[] | undefined>;
    findNewlyAddEmployees(shop_id: string): Promise<Employee[] | undefined>;
    findEmployeeByParameters(parameter: string): Promise<Employee[] | undefined>;
    create(data: ICreateEmployeeDTO): Promise<Employee>;
    save(Employee: Employee): Promise<Employee>;
}