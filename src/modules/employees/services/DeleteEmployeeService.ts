import { inject, injectable } from 'tsyringe';

import IEmployeesRepository from '../repositories/IEmployeesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    shop_id: string;
}

@injectable()
class DeleteEmployeeService {
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,
    ) {}

    public async execute({ id, shop_id }: IRequest): Promise<void> {
        const employee = await this.employeesRepository.findById(id, shop_id);

        if(!employee)
            throw new AppError('Employee not found');

        await this.employeesRepository.delete(id);
    }

}

export default DeleteEmployeeService;