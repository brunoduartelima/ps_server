import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICompaniesRepository from '../repositories/ICompaniesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Company from '@modules/companies/infra/typeorm/entities/Company';

interface IRequest {
    name: string;
    company_type: string;
    uf: string;
    city: string;
    user_id: string;
}

@injectable()
class CreateCompanyService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ name, company_type, uf, city, user_id }: IRequest): Promise<Company> {
        const user = await this.usersRepository.findById(user_id);

        if(!user)
            throw new AppError('User not found');

        const userOwnsCompany = await this.companiesRepository.findCompany(user_id);

        if (userOwnsCompany)
            throw new AppError('User has a registered company.');

        const company = await this.companiesRepository.create({
            name,
            company_type,
            uf,
            city,
            user_id
        });

        return company;
    }
}

export default CreateCompanyService;