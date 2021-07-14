import { inject, injectable } from 'tsyringe';

import ISalesRepository from '../repositories/ISalesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    company_id: string;
}

@injectable()
class DeleteSaleService {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
    ) {}

    public async execute({ id, company_id }: IRequest): Promise<void> {
        const sale = await this.salesRepository.findById(id, company_id);

        if(!sale)
            throw new AppError('Sale not found');

        await this.salesRepository.softDelete(id);
    }

}

export default DeleteSaleService;