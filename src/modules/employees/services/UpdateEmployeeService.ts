import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEmployeesRepository from '../repositories/IEmployeesRepository';

import Employee from '@modules/employees/infra/typeorm/entities/Employee';

interface IRequest {
    id: string;
    name: string;
    salary: number;
    date_birth: Date;
    active: boolean;
}

@injectable()
class UpdateEmployeeService {
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,
    ) {}

    public async execute({ id, name, salary, date_birth, active }: IRequest): Promise<Employee> {
        const employee = await this.employeesRepository.findById(id);

        if(!employee)
            throw new AppError('Employee not found');

        employee.name = name;
        employee.salary = salary;
        employee.date_birth = date_birth;
        employee.active = active;

        return this.employeesRepository.save(employee);
    }

}

export default UpdateEmployeeService;