import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindEmployeeByNameService from '@modules/employees/services/FindEmployeeByNameService';

export default class FindEmployeeByNameController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { name, page = 1 } = request.query;

        const findEmployees = container.resolve(FindEmployeeByNameService);

        const employees = await findEmployees.execute({ company_id, name: String(name), page: Number(page) });

        return response.json(employees);

    }
}