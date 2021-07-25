import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IUsersEmployeesRepository from '../repositories/IUsersEmployeesRepository';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordUserEmployeeEmailService {
    constructor(
        @inject('UsersEmployeesRepository')
        private usersEmployeesRepository: IUsersEmployeesRepository,

        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersEmployeesRepository.findByEmail(email);

        if (!user)
            throw new AppError('User does not exists.');
        
        const employee = await this.employeesRepository.findById(user.employee_id, user.company_id);

        if(!employee)
            throw new AppError('Employee not found.');
    
        if(employee.active === false || employee.deleted_at !== null)
            throw new AppError('This employee is disabled.');

        const { token } = await this.userTokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            '..',
            'users',
            'views',
            'forgot_password.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: employee.name,
                email: user.email,
            },
            subject: '[PsManager] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: employee.name,
                    link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
                },
            },
        });

    }
}

export default SendForgotPasswordUserEmployeeEmailService;