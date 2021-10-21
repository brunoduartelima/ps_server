import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllUsersEmployeesFromCompanyService from '@modules/users_employees/services/FindAllUsersEmployeesFromCompanyService';
import { classToClass } from 'class-transformer';

export default class FindAllUsersEmployeesFromCompanyController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;

        const findUsersEmployees = container.resolve(FindAllUsersEmployeesFromCompanyService);

        const usersEmployees = await findUsersEmployees.execute({ company_id });

        return response.json(classToClass(usersEmployees));
    }
}