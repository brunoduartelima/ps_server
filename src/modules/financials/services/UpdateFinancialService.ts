import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFinancialsRepository from '../repositories/IFinancialsRepository';

import Financial from '@modules/financials/infra/typeorm/entities/Financial';

interface IRequest {
    id: string;
    title: string;
    description?: string;
    value: number;
    type: string;
    parcel_mount: number;
    due_date: Date;
    active: boolean;
    company_id: string;
}

@injectable()
class UpdateFinancialService {
    constructor(
        @inject('FinancialsRepository')
        private financialsRepository: IFinancialsRepository,
    ) {}

    public async execute({ 
        id,         
        title, 
        type,
        description, 
        value, 
        parcel_mount, 
        due_date, 
        active, 
        company_id }: IRequest): Promise<Financial> {
        const financial = await this.financialsRepository.findById(id, company_id);

        if(!financial)
            throw new AppError('Financial not found');

        if(financial.title !== title) {
            const financialTitle = await this.financialsRepository.findTitleForControl(company_id, title);

            if(financialTitle)
                throw new AppError('The title of this financial is already in use.');
        }

        if(financial.deleted_at !== null)
            throw new AppError('Financial deleted, operation not permitted');

            financial.title = title;
            financial.type = type; 
            financial.description = description; 
            financial.value = value; 
            financial.parcel_mount = parcel_mount; 
            financial.due_date = due_date;
            financial.active = active; 

        return await this.financialsRepository.save(financial);
    }

}

export default UpdateFinancialService;