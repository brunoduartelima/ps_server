import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICompaniesRepository from '../repositories/ICompaniesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Company from '@modules/companies/infra/typeorm/entities/Company';

interface IRequest {
    name: string;
    companyType: string;
    uf: string;
    city: string;
    idUser: string;
}

@injectable()
class CreateCompanyService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ name, companyType, uf, city, idUser }: IRequest): Promise<Company> {
        const user = await this.usersRepository.findById(idUser);

        if(!user)
            throw new AppError('User not found');

        const userOwnsCompany = await this.companiesRepository.findCompany(idUser);

        if (userOwnsCompany)
            throw new AppError('User has a registered company.');

        const company = await this.companiesRepository.create({
            name,
            companyType,
            uf,
            city,
            idUser
        });

        return company;
    }
}

export default CreateCompanyService;