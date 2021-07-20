import UserEmployee from '../infra/typeorm/entities/UserEmployee';
import ICreateUserEmployeeDTO from '../dtos/ICreateUserEmployeeDTO';

export default interface IUsersEmployeesRepository {
    findByEmail(email: string): Promise<UserEmployee | undefined>;
    findById(id: string): Promise<UserEmployee | undefined>;
    create(data: ICreateUserEmployeeDTO): Promise<UserEmployee>;
    save(user: UserEmployee): Promise<UserEmployee>;
}