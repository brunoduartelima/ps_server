import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFinancialsRepository from '../repositories/IFinancialsRepository';
import Financial from '@modules/financials/infra/typeorm/entities/Financial';

interface IRequest {
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
class CreateFinancialService {
    constructor(
        @inject('FinancialsRepository')
        private financialsRepository: IFinancialsRepository,
    ) {}

    public async execute({         
        title, 
        type,
        description, 
        value, 
        parcel_mount, 
        due_date, 
        active, 
        company_id }: IRequest): Promise<Financial> {
        const financialTitle = await this.financialsRepository.findTitleForControl(company_id, title);

        if(financialTitle)
            throw new AppError('The title of this financial is already in use.');

        const financial = await this.financialsRepository.create({
            title, 
            type,
            description, 
            value, 
            parcel_mount, 
            due_date, 
            active, 
            company_id
        });

        return financial;
    }

}

export default CreateFinancialService;