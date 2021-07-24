import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersEmployeesRepository from '../repositories/IUsersEmployeesRepository';
import IHashProvider from '../../users/providers/HashProvider/models/IHashProvider';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';

import UserEmployee from '@modules/users-employees/infra/typeorm/entities/UserEmployee';

interface IRequest {
    email: string;
    password: string;
    company_id: string;
    employee_id: string;
}

@injectable()
class CreateUserEmployeeService {
    constructor(
        @inject('UsersEmployeesRepository')
        private usersEmployeesRepository: IUsersEmployeesRepository,

        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password, company_id, employee_id }: IRequest): Promise<UserEmployee> {
        const employee = await this.employeesRepository.findById(employee_id, company_id);

        if(!employee)
            throw new AppError('Employee not found.');
        
        if(employee.active === false || employee.deleted_at !== null)
            throw new AppError('This employee is disabled.');

        const checkEmail = await this.usersEmployeesRepository.findByEmail(email);

        if(checkEmail)
            throw new AppError('Email already used.');

        const hashedPassword = await this.hashProvider.generateHash(password);

        const userEmployee = await this.usersEmployeesRepository.create({
            email,
            password: hashedPassword,
            company_id,
            employee_id
        });

        return userEmployee;
    }

}

export default CreateUserEmployeeService;