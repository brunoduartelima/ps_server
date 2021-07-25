import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllUsersEmployeesFromCompanyService from '@modules/users_employees/services/FindAllUsersEmployeesFromCompanyService';

export default class FindAllUsersEmployeesFromCompanyController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { page = 1 } = request.query;

        const findUsersEmployees = container.resolve(FindAllUsersEmployeesFromCompanyService);

        const usersEmployees = await findUsersEmployees.execute({ company_id, page: Number(page) });

        return response.json(usersEmployees);
    }
}