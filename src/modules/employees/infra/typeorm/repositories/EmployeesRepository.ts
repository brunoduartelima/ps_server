import { getRepository, Repository, ILike } from 'typeorm';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';

import Employee from '../entities/Employee';

class EmployeesRepository implements IEmployeesRepository {
    private ormRepository: Repository<Employee>;

    constructor() {
        this.ormRepository = getRepository(Employee);
    }

    public async findById(id: string, shop_id: string): Promise<Employee | undefined> {
        const employee = await this.ormRepository.findOne({ where: { id, shop_id }, withDeleted: true });

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
            order: { created_at: 'DESC' },
            take: 15
        });

        return employees;
    }

    public async findEmployeeByName(shop_id: string, name: string): Promise<Employee[] | undefined> {
        const employees = this.ormRepository.find({
            where: {
                shop_id,
                name: ILike(`%${name}%`)
            },
            order: { name: 'ASC'}
        });

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

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default EmployeesRepository;