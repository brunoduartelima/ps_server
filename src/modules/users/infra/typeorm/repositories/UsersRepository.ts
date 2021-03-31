import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findUserExistence(email: string, cpf: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email, cpf } });

        return user;
    }

    public async create({ name, cpf, phone, email, password }: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({ name, cpf, phone, email, password });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;