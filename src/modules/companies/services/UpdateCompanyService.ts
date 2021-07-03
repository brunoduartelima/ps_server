import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

import Company from '@modules/companies/infra/typeorm/entities/Company';

interface IRequest {
    name: string;
    company_type: string;
    uf: string;
    city: string;
    company_id: string;
}

@injectable()
class UpdateCompanyService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,
    ) {}

    public async execute({ name, company_type, uf, city, company_id }: IRequest): Promise<Company> {
        const company = await this.companiesRepository.findById(company_id);

        if (!company)
            throw new AppError('Company not found');
        
        company.name = name;
        company.company_type = company_type;
        company.uf = uf;
        company.city = city;

        await this.companiesRepository.save(company);

        return company;
    }
}

export default UpdateCompanyService;