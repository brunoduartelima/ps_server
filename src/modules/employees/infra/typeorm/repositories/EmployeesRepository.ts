import { getRepository, Repository, SelectQueryBuilder } from 'typeorm';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';

import Employee from '../entities/Employee';

class EmployeesRepository implements IEmployeesRepository {
    private ormRepository: Repository<Employee>;

    constructor() {
        this.ormRepository = getRepository(Employee);
    }

    public async findById(id: string): Promise<Employee | undefined> {
        const employee = await this.ormRepository.findOne(id);

        return employee;
    }

    public async findAllEmployeesFromShop(shop_id: string, page: number): Promise<Employee[] | undefined> {
        const employees = await this.ormRepository.find({ 
            where: { shop_id }, 
            order: { name:'ASC' },
            take: 30,
            skip: (page - 1) * 30
        });

        return employees;
    }

    public async findNewlyAddEmployees(shop_id: string): Promise<Employee[] | undefined> {
        const employees = await this.ormRepository.find({ 
            where: { shop_id }, 
            order: { id:'DESC' }, 
            take: 15
        });

        return employees;
    }

    public async findEmployeeByName(shop_id: string, name: string): Promise<SelectQueryBuilder<Employee> | undefined> {
        const employees = this.ormRepository.createQueryBuilder()
        .where({ shop_id })
        .andWhere('name like :name', { name: `%${name}%` })
        .orderBy('name');

        return employees;
    }

    public async create({ name, salary, date_birth, phone, active, shop_id }: ICreateEmployeeDTO): Promise<Employee> {
        const employee = this.ormRepository.create({ name, salary, date_birth, phone, active, shop_id });

        await this.ormRepository.save(employee);

        return employee;
    }

    public async save(employee: Employee): Promise<Employee> {
        return this.ormRepository.save(employee);
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}

export default EmployeesRepository;