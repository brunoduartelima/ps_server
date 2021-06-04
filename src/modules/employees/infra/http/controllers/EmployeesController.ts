import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';

export default class EmployeesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { name, salary, date_birth, active } = request.body;

        const createEmployee = container.resolve(CreateEmployeeService);

        const employee = await createEmployee.execute({
            name, 
            salary, 
            date_birth, 
            active, 
            shop_id
        });

        return response.json(employee);
    }
}