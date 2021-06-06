import { inject, injectable } from 'tsyringe';

import IEmployeesRepository from '../repositories/IEmployeesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}

@injectable()
class DeleteEmployeeService {
    constructor(
        @inject('EmployeesRepository')
        private employeesRepository: IEmployeesRepository,
    ) {}

    public async execute({ id }: IRequest): Promise<void> {
        const employee = await this.employeesRepository.findById(id);

        if(!employee)
            throw new AppError('Employee not found');

        await this.employeesRepository.delete(id);
    }

}

export default DeleteEmployeeService;