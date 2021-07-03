import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';
import Company from '@modules/companies/infra/typeorm/entities/Company';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    company: Company;
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user)
            throw new AppError('Incorrect email/password combination.', 401);
                
        const company = await this.companiesRepository.findCompany(user.id);
        
        if (!company)
            throw new AppError('User has not completed all registration steps.', 401);

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!passwordMatched)
            throw new AppError('Incorrect email/password combination.', 401);

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ user: user.id }, secret, {
            subject: company.id,
            expiresIn,
        });

        return {
            company,
            user,
            token,
        };
    }
}

export default AuthenticateUserService;