import { getRepository, Repository, ILike } from 'typeorm';

import IFinancialsRepository from '@modules/financials/repositories/IFinancialsRepository';
import ICreateFinancialDTO from '@modules/financials/dtos/ICreateFinancialDTO';

import Financial from '../entities/Financial';

class FinancialsRepository implements IFinancialsRepository {
    private ormRepository: Repository<Financial>;

    constructor() {
        this.ormRepository = getRepository(Financial);
    }

    public async findById(id: string, company_id: string): Promise<Financial | undefined> {
        const financial = await this.ormRepository.findOne({ where: { id, company_id }, withDeleted: true });

        return financial;
    }

    public async findAllFinancialsFromCompany(company_id: string, page: number): Promise<Financial[] | undefined> {
        const financials = await this.ormRepository.find({ 
            where: { company_id }, 
            order: { title:'ASC' },
            take: 30,
            skip: (page - 1) * 30
        });

        return financials;
    }

    public async findNewlyAddFinancials(company_id: string): Promise<Financial[] | undefined> {
        const financials = await this.ormRepository.find({ 
            where: { company_id }, 
            order: { created_at: 'DESC' },
            take: 15
        });

        return financials;
    }

    public async findFinancialByTitle(company_id: string, title: string): Promise<Financial[] | undefined> {
        const financials = this.ormRepository.find({
            where: {
                company_id,
                name: ILike(`%${title}%`)
            },
            order: { title: 'ASC'}
        });

        return financials;
    }

    public async findTitleForControl(company_id: string, title: string): Promise<Financial | undefined> {
        const financial = await this.ormRepository.findOne({
            where: { title, company_id }
        });

        return financial;
    }

    public async create({ 
        title, 
        type,
        description, 
        value, 
        parcel_mount, 
        due_date, 
        active, 
        company_id }: ICreateFinancialDTO): Promise<Financial> {
        
        const financial = this.ormRepository
            .create({ 
                title,
                type, 
                description, 
                value, 
                parcel_mount, 
                due_date, active, 
                company_id 
            });

        await this.ormRepository.save(financial);

        return financial;
    }

    public async save(financial: Financial): Promise<Financial> {
        return await this.ormRepository.save(financial);
    }

    public async softDelete(id: string): Promise<void> {
        await this.ormRepository.softDelete(id);
    }

    public async restore(id: string): Promise<void> {
        await this.ormRepository.restore(id);
    }
}

export default FinancialsRepository;