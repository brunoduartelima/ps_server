import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IEmployeesRepository from '../repositories/IEmployeesRepository';
import Employee from '../infra/typeorm/entities/Employee';

interface IRequest {
    company_id: string;
    page: number;
}

@injectable()
class FindAllEmployeesFromCompanyService {
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,
    ) {}

    public async execute({ company_id, page }: IRequest): Promise<Employee[]> {
        const employees = await this.employeesRepository.findAllEmployeesFromCompany(company_id, page);

        if(!employees)
            throw new AppError('Employee not found');

        return employees;
    }

}

export default FindAllEmployeesFromCompanyService;