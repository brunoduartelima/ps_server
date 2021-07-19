import { inject, injectable } from 'tsyringe';

import IFinancialsRepository from '../repositories/IFinancialsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    company_id: string;
}

@injectable()
class DeleteFinancialService {
    constructor(
        @inject('FinancialsRepository')
        private financialsRepository: IFinancialsRepository,
    ) {}

    public async execute({ id, company_id }: IRequest): Promise<void> {
        const financial = await this.financialsRepository.findById(id, company_id);

        if(!financial)
            throw new AppError('Financial not found');

        await this.financialsRepository.softDelete(id);
    }

}

export default DeleteFinancialService;