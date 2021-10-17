import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindEmployeeDetailsService from '@modules/employees/services/FindEmployeeDetailsService';

export default class FindEmployeeDetailsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { id } = request.params;

        const findEmployee = container.resolve(FindEmployeeDetailsService);

        const employee = await findEmployee.execute({ company_id, id });

        return response.json(employee);

    }
}