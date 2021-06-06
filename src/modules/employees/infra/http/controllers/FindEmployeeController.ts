import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindNewlyAddEmployeesService from '@modules/employees/services/FindNewlyAddEmployeesService';

export default class FindEmployeeController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;

        const findEmployees = container.resolve(FindNewlyAddEmployeesService);

        const employees = await findEmployees.execute({ shop_id });

        return response.json(employees);

    }
}