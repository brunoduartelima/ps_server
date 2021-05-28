import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, cpf, phone, email, password }: IRequest): Promise<User> {

        const checkEmail = await this.usersRepository.findByEmail(email);

        if (checkEmail)
            throw new AppError('Email already used.');
        
        const checkCpf = await this.usersRepository.findByCpf(cpf);

        if (checkCpf)
            throw new AppError('CPF already used.');

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            cpf,
            phone,
            email,
            password: hashedPassword,
        });

        return user;
    }

}

export default CreateUserService;