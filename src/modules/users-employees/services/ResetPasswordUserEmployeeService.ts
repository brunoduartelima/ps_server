import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUsersEmployeesRepository from '../repositories/IUsersEmployeesRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserEmployeeService {
    constructor(
        @inject('UsersEmployeesRepository')
        private usersEmployeesRepository: IUsersEmployeesRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken)
            throw new AppError('User token does not exists');    
        
        const userEmployee = await this.usersEmployeesRepository.findById(userToken.user_id);

        if (!userEmployee)
            throw new AppError('User does not exists');

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate))
            throw new AppError('Token expired.');

        userEmployee.password = await this.hashProvider.generateHash(password);

        await this.usersEmployeesRepository.save(userEmployee);
    }
}

export default ResetPasswordUserEmployeeService;
