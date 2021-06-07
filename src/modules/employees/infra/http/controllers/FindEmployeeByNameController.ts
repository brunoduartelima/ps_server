import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindEmployeeByNameService from '@modules/employees/services/FindEmployeeByNameService';

export default class FindEmployeeController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { name } = request.query;

        const findEmployees = container.resolve(FindEmployeeByNameService);

        const employees = await findEmployees.execute({ shop_id, name: String(name) });

        return response.json(employees);

    }
}