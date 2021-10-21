import { inject, injectable } from 'tsyringe';

import IUsersEmployeesRepository from '../repositories/IUsersEmployeesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}

@injectable()
class DeleteUserEmployeeService {
    constructor(
        @inject('UsersEmployeesRepository')
        private usersEmployeesRepository: IUsersEmployeesRepository,
    ) {}

    public async execute({ id }: IRequest): Promise<void> {
        const user = await this.usersEmployeesRepository.findById(id);

        if(!user)
            throw new AppError('User not found');

        await this.usersEmployeesRepository.softDelete(id);
    }

}

export default DeleteUserEmployeeService;