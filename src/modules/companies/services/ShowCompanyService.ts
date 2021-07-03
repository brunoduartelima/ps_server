import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICompaniesRepository from '../repositories/ICompaniesRepository';
import Company from '@modules/companies/infra/typeorm/entities/Company';

interface IRequest {
    company_id: string;
}

@injectable()
class ShowCompanyService {
    constructor(
        @inject('CompaniesRepository')
        private companiesRepository: ICompaniesRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<Company> {
        const company = await this.companiesRepository.findById(company_id);

        if (!company)
            throw new AppError('Company not found');

        return company;
    }
}

export default ShowCompanyService;