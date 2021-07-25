import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersEmployeesRepository from '../repositories/IUsersEmployeesRepository';
import UserEmployee from '../infra/typeorm/entities/UserEmployee';

interface IRequest {
    company_id: string;
    page: number;
}

@injectable()
class FindAllUserEmployeesFromCompanyService {
    constructor(
        @inject('UsersEmployeesRepository')
        private usersEmployeesRepository: IUsersEmployeesRepository,
    ) {}

    public async execute({ company_id, page }: IRequest): Promise<UserEmployee[]> {
        const usersEmployees = await this.usersEmployeesRepository.findAllUsersEmployeesFromCompany(company_id, page);

        if(!usersEmployees)
            throw new AppError('Employees users not found');

        return usersEmployees;
    }

}

export default FindAllUserEmployeesFromCompanyService;