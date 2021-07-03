import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IEmployeesRepository from '../repositories/IEmployeesRepository';
import Employee from '../infra/typeorm/entities/Employee';

interface IRequest {
    company_id: string;
}

@injectable()
class FindNewlyAddEmployeesService {
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<Employee[]> {
        const employees = await this.employeesRepository.findNewlyAddEmployees(company_id);

        if(!employees)
            throw new AppError('Employee not found');

        return employees;
    }

}

export default FindNewlyAddEmployeesService;