import Employee from '../infra/typeorm/entities/Employee';
import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';
import { SelectQueryBuilder } from 'typeorm';

export default interface IEmployeesRepository {
    findById(id: string, shop_id: string): Promise<Employee | undefined>;
    findAllEmployeesFromShop(shop_id: string, page: number): Promise<Employee[] | undefined>;
    findNewlyAddEmployees(shop_id: string): Promise<Employee[] | undefined>;
    findEmployeeByName(shop_id: string, name: string): Promise<Employee[] | undefined>;
    create(data: ICreateEmployeeDTO): Promise<Employee>;
    save(Employee: Employee): Promise<Employee>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
}