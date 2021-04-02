import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    findUserExistence(email: string, cpf: string | null): Promise<User | undefined>
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}