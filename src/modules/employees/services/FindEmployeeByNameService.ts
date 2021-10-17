import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IEmployeesRepository from '../repositories/IEmployeesRepository';
import Employee from '../infra/typeorm/entities/Employee';

interface IRequest {
    name: string;
    company_id: string;
    page: number;
}

@injectable()
class FindEmployeeByNameService {
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,
    ) {}

    public async execute({ company_id, name, page }: IRequest): Promise<[Employee[], number]> {
        const employees = await this.employeesRepository.findEmployeeByName(company_id, name, page);

        if(!employees)
            throw new AppError('Employee not found');

        return employees;
    }

}

export default FindEmployeeByNameService;