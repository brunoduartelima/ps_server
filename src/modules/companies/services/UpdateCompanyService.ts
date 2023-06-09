import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

import Company from '@modules/companies/infra/typeorm/entities/Company';

interface IRequest {
    name: string;
    companyType: string;
    uf: string;
    city: string;
    idCompany: string;
}

@injectable()
class UpdateCompanyService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,
    ) {}

    public async execute({ name, companyType, uf, city, idCompany }: IRequest): Promise<Company> {
        const company = await this.companiesRepository.findById(idCompany);

        if (!company)
            throw new AppError('Company not found');
        
        company.name = name;
        company.companyType = companyType;
        company.uf = uf;
        company.city = city;

        await this.companiesRepository.save(company);

        return company;
    }
}

export default UpdateCompanyService;