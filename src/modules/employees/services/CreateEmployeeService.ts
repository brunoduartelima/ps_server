import { inject, injectable } from 'tsyringe';

import IEmployeesRepository from '../repositories/IEmployeesRepository';

import Employee from '@modules/employees/infra/typeorm/entities/Employee';

interface IRequest {
    name: string;
    salary: number;
    date_birth: Date;
    phone: string;
    active: boolean;
    company_id: string;
}

@injectable()
class CreateEmployeeService {
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,
    ) {}

    public async execute({ name, salary, date_birth, phone, active, company_id }: IRequest): Promise<Employee> {
        const employee = await this.employeesRepository.create({
            name,
            salary, 
            date_birth,
            phone,
            active, 
            company_id
        });

        return employee;
    }

}

export default CreateEmployeeService;