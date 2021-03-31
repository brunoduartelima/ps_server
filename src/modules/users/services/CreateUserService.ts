import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';

interface IRequest {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
}

class CreateUserService {

    public async execute({ name, cpf, phone, email, password }: IRequest): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email, cpf }
        });

        if (checkUserExists)
            throw new Error('Email or CPF already used.');

        const user = usersRepository.create({
            name,
            cpf,
            phone,
            email,
            password,
        });

        await usersRepository.save(user);

        return user;
    }

}

export default CreateUserService;