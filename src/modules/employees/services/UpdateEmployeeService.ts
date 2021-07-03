import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

import Employee from '@modules/employees/infra/typeorm/entities/Employee';

interface IRequest {
    id: string;
    company_id: string;
    name: string;
    salary: number;
    date_birth: Date;
    phone: string;
    active: boolean;
}

@injectable()
class UpdateEmployeeService {
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,
    ) {}

    public async execute({ id, company_id, name, salary, date_birth, phone, active }: IRequest): Promise<Employee> {
        const employee = await this.employeesRepository.findById(id, company_id);

        if(!employee)
            throw new AppError('Employee not found');
        
        if(employee.deleted_at !== null)
            throw new AppError('Employee deleted, operation not permitted');

        employee.name = name;
        employee.salary = salary;
        employee.date_birth = date_birth;
        employee.phone = phone;
        employee.active = active;

        return this.employeesRepository.save(employee);
    }

}

export default UpdateEmployeeService;