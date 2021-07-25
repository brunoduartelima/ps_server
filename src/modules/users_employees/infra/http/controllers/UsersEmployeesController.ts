import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserEmployeeService from '@modules/users_employees/services/CreateUserEmployeeService';
import UpdateUserEmployeeService from '@modules/users_employees/services/UpdateUserEmployeeService';

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

    public async update(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.token;
        const { email, password, old_password } = request.body;

        const updateUserEmployee = container.resolve(UpdateUserEmployeeService);
    
        const userEmployee = await updateUserEmployee.execute({
            email, 
            password,
            old_password,
            user_id
        });
    
        return response.json(classToClass(userEmployee));
    }
}