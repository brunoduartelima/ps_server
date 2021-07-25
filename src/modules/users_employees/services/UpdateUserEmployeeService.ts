import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersEmployeesRepository from '../repositories/IUsersEmployeesRepository';

import UserEmployee from '@modules/users_employees/infra/typeorm/entities/UserEmployee';

interface IRequest {
    user_id: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateUserEmployeeService {
    constructor(
        @inject('UsersEmployeesRepository')
        private usersEmployeesRepository: IUsersEmployeesRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ user_id, email, password, old_password }: IRequest): Promise<UserEmployee> {
        const user = await this.usersEmployeesRepository.findById(user_id);

        if (!user)
            throw new AppError('User not found');

        const userWithUpdatedEmail = await this.usersEmployeesRepository.findByEmail(email);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id)
            throw new AppError('E-mail already in use.');

        user.email = email;

        if (password && !old_password)
            throw new AppError('You need to inform the old password to set a new password.');

        if (password && old_password){
            const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

            if (!checkOldPassword)
                throw new AppError('Old password does not match.');
            
            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersEmployeesRepository.save(user);
    }
}

export default UpdateUserEmployeeService;