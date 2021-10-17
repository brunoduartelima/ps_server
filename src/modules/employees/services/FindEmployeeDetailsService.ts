import { inject, injectable } from 'tsyringe';

import IEmployeesRepository from '../repositories/IEmployeesRepository';
import Employee from '../infra/typeorm/entities/Employee';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    company_id: string;
}

@injectable()
class FindEmployeeDetailsService {
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,
    ) {}

    public async execute({ id, company_id }: IRequest): Promise<Employee> {
        const employee = await this.employeesRepository.findById(id, company_id);

        if(!employee)
            throw new AppError('Employee not found');

        return employee;
    }

}

export default FindEmployeeDetailsService;