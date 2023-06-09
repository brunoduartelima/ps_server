import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AuthenticateUserEmployeeService from '@modules/users_employees/services/AuthenticateUserEmployeeService';

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password, typeUser } = request.body;

        if(typeUser === 'master') {
            const authenticateUser = container.resolve(AuthenticateUserService);

            const { company, user, token } = await authenticateUser.execute({
                email,
                password,
            });
    
            return response.json({ company, user: classToClass(user), token });
        } else {
            const authenticateUser = container.resolve(AuthenticateUserEmployeeService);

            const { company, user, token } = await authenticateUser.execute({
                email,
                password,
            });
    
            return response.json({ company, user: classToClass(user), token });
        }
    }
}