import { getRepository, Repository } from 'typeorm';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import Company from '../entities/Company';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';

class CompaniesRepository implements ICompaniesRepository {
    private ormRepository: Repository<Company>

    constructor() {
        this.ormRepository = getRepository(Company);
    }

    public async findById(id: string): Promise<Company | undefined> {
        const company = await this.ormRepository.findOne(id);

        return company;
    }

    public async findCompany(idUser: string): Promise<Company | undefined> {
        const company = await this.ormRepository.findOne({ where: { idUser } });

        return company;
    }

    public async create({ name, companyType, uf, city, idUser  }: ICreateCompanyDTO): Promise<Company> {
        const company = this.ormRepository.create({ name, companyType, uf, city, idUser });

        await this.ormRepository.save(company);

        return company;
    }

    public async save(company: Company): Promise<Company> {
        return await this.ormRepository.save(company);
    }
}

export default CompaniesRepository;