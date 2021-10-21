import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IUsersEmployeesRepository from '../repositories/IUsersEmployeesRepository';
import IHashProvider from '../../users/providers/HashProvider/models/IHashProvider';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import UserEmployee from '@modules/users_employees/infra/typeorm/entities/UserEmployee';

interface IRequest {
    email: string;
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

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async execute({ email, company_id, employee_id }: IRequest): Promise<UserEmployee> {
        const employee = await this.employeesRepository.findById(employee_id, company_id);

        if(!employee)
            throw new AppError('Employee not found.');
        
        if(employee.active === false || employee.deleted_at !== null)
            throw new AppError('This employee is disabled.');

        const employeeHasUser = await this.usersEmployeesRepository.findByEmployeeId(employee_id);

        if(employeeHasUser)
            throw new AppError('Collaborator already has a user');

        const quantityUsers = await this.usersEmployeesRepository.findAllUsersEmployeesFromCompany(company_id);

        if(quantityUsers && quantityUsers.length >= 3)
            throw new AppError('Maximum number of users exceeded');

        const checkEmail = await this.usersEmployeesRepository.findByEmail(email);

        if(checkEmail)
            throw new AppError('Email already used.');
            
        const hashedPassword = await this.hashProvider.generateHash(employee_id);
        
        const userEmployee = await this.usersEmployeesRepository.create({
            email,
            password: hashedPassword,
            company_id,
            employee_id
        });

        const { token } = await this.userTokensRepository.generate(userEmployee.id);

        const registerPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'register_password.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: employee.name,
                email: email,
            },
            subject: '[PsManager] Registro de senha',
            templateData: {
                file: registerPasswordTemplate,
                variables: {
                    name: employee.name,
                    link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
                },
            },
        });
        
        return userEmployee;
    }

}

export default CreateUserEmployeeService;