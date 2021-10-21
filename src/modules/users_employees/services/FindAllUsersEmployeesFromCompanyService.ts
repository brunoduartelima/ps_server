import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersEmployeesRepository from '../repositories/IUsersEmployeesRepository';
import UserEmployee from '../infra/typeorm/entities/UserEmployee';

interface IRequest {
    company_id: string;
}

@injectable()
class FindAllUserEmployeesFromCompanyService {
    constructor(
        @inject('UsersEmployeesRepository')
        private usersEmployeesRepository: IUsersEmployeesRepository,
    ) {}

    public async execute({ company_id }: IRequest): Promise<UserEmployee[]> {
        const usersEmployees = await this.usersEmployeesRepository.findAllUsersEmployeesFromCompany(company_id);

        if(!usersEmployees)
            throw new AppError('Employees users not found');

        return usersEmployees;
    }

}

export default FindAllUserEmployeesFromCompanyService;