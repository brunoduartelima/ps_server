import { getRepository, Repository } from 'typeorm';

import IUsersEmployeesRepository from '@modules/users_employees/repositories/IUsersEmployeesRepository';
import ICreateUserEmployeeDTO from '@modules/users_employees/dtos/ICreateUserEmployeeDTO';

import UserEmployee from '../entities/UserEmployee';

class UsersEmployeesRepository implements IUsersEmployeesRepository {
    private ormRepository: Repository<UserEmployee>;

    constructor() {
        this.ormRepository = getRepository(UserEmployee);
    }

    public async findByEmail(email: string): Promise<UserEmployee | undefined> {
        const user = await this.ormRepository.findOne({ where: { email }});
        
        return user;
    }

    public async findById(id: string): Promise<UserEmployee | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findAllUsersEmployeesFromCompany(company_id: string, page: number): Promise<UserEmployee[] | undefined> {
        const users = await this.ormRepository.find({ 
            where: { company_id }, 
            order: { email:'ASC' },
            take: 30,
            skip: (page - 1) * 30
        });

        return users;
    }

    public async create({ email, password, employee_id, company_id }: ICreateUserEmployeeDTO): Promise<UserEmployee> {
        const user = this.ormRepository.create({ email, password, employee_id, company_id });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: UserEmployee): Promise<UserEmployee> {
        return await this.ormRepository.save(user);
    }
}

export default UsersEmployeesRepository;