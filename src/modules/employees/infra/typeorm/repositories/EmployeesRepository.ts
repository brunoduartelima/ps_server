import { getRepository, Repository, ILike } from 'typeorm';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';

import Employee from '../entities/Employee';

interface IFindEmployees {
    id: string;
}

class EmployeesRepository implements IEmployeesRepository {
    private ormRepository: Repository<Employee>;

    constructor() {
        this.ormRepository = getRepository(Employee);
    }

    public async findById(id: string, company_id: string): Promise<Employee | undefined> {
        const employee = await this.ormRepository.findOne({ where: { id, company_id } });

        return employee;
    }

    public async findAllById(employees: IFindEmployees[], company_id: string): Promise<Employee[]> {
        const employeeIds = employees.map(employee => employee.id);
    
        const existentEmployees = await this.ormRepository.findByIds(employeeIds, { 
            where: { company_id }
        });
    
        return existentEmployees;
    }

    public async findAllEmployeesFromCompany(company_id: string, page: number): Promise<[Employee[], number] | undefined> {
        const employees = await this.ormRepository.findAndCount({ 
            where: { company_id }, 
            order: { name:'ASC' },
            take: 10,
            skip: (page - 1) * 10,
            
        });

        return employees;
    }

    public async findNewlyAddEmployees(company_id: string): Promise<Employee[] | undefined> {
        const employees = await this.ormRepository.find({ 
            where: { company_id }, 
            order: { created_at: 'DESC' },
            take: 10
        });

        return employees;
    }

    public async findEmployeeByName(company_id: string, name: string, page: number): Promise<[Employee[], number] | undefined> {
        const employees = this.ormRepository.findAndCount({
            where: {
                company_id,
                name: ILike(`%${name}%`)
            },
            order: { name: 'ASC'},
            take: 10,
            skip: (page - 1) * 10,
        });

        return employees;
    }

    public async create({ name, salary, date_birth, phone, active, company_id }: ICreateEmployeeDTO): Promise<Employee> {
        const employee = this.ormRepository.create({ name, salary, date_birth, phone, active, company_id });

        await this.ormRepository.save(employee);

        return employee;
    }

    public async save(employee: Employee): Promise<Employee> {
        return await this.ormRepository.save(employee);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default EmployeesRepository;