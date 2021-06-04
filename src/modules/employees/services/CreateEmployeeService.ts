import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEmployeesRepository from '../repositories/IEmployeesRepository';
import IShopsRepository from '@modules/shops/repositories/IShopsRepository';


import Employee from '@modules/employees/infra/typeorm/entities/Employee';

interface IRequest {
    name: string;
    salary: number;
    date_birth: Date;
    active: boolean;
    shop_id: string;
}

@injectable()
class CreateEmployeeService {
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,

        @inject('ShopsRepository')
        private shopsRepository: IShopsRepository,
    ) {}

    public async execute({ name, salary, date_birth, active, shop_id }: IRequest): Promise<Employee> {
        const shop = await this.shopsRepository.findById(shop_id);

        if (!shop)
            throw new AppError('Shop not found');

        const employee = await this.employeesRepository.create({
            name,
            salary, 
            date_birth, 
            active, 
            shop_id
        });

        return employee;
    }

}

export default CreateEmployeeService;