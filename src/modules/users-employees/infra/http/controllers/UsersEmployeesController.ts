import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserEmployeeService from '@modules/users-employees/services/CreateUserEmployeeService';

export default class UsersEmployeesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { email, password, employee_id } = request.body;

        const createUserEmployee = container.resolve(CreateUserEmployeeService);
    
        const userEmployee = await createUserEmployee.execute({
            email, 
            password,
            company_id,
            employee_id
        });
    
        return response.json(classToClass(userEmployee));
    }
}