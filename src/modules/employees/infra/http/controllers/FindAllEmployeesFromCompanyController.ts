import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllEmployeesFromCompanyService from '@modules/employees/services/FindAllEmployeesFromCompanyService';

export default class FindAllEmployeesFromCompanyController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { page = 1 } = request.query;

        const findEmployees = container.resolve(FindAllEmployeesFromCompanyService);

        const employees = await findEmployees.execute({ company_id, page: Number(page) });

        return response.json(employees);
    }
}