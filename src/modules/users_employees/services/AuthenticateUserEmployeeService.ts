import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersEmployeesRepository from '../repositories/IUsersEmployeesRepository';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import UserEmployee from '../infra/typeorm/entities/UserEmployee';
import Company from '@modules/companies/infra/typeorm/entities/Company';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    company: Company;
    user: UserEmployee;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersEmployeesRepository')
        private usersEmployeesRepository: IUsersEmployeesRepository,

        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const userEmployee = await this.usersEmployeesRepository.findByEmail(email);

        if (!userEmployee)
            throw new AppError('Incorrect email combination.', 401);

        const employee = await this.employeesRepository.findById(userEmployee.employee_id, userEmployee.company_id);

        if(!employee)
            throw new AppError('Employee not found.');
        
        if(employee.active === false || employee.deleted_at !== null)
            throw new AppError('This employee is disabled.');

        const company = await this.companiesRepository.findById(userEmployee.company_id);

        if (!company)
            throw new AppError('Company not found.');

        const passwordMatched = await this.hashProvider.compareHash(password, userEmployee.password);

        if (!passwordMatched)
            throw new AppError('Incorrect password combination.', 401);

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ user: userEmployee.id, access_level: 'regular' }, secret, {
            subject: userEmployee.company_id,
            expiresIn,
        });

        return {
            company,
            user: userEmployee,
            token,
        };

    }
}

export default AuthenticateUserService;