import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AuthenticateUserEmployeeService from '@modules/users-employees/services/AuthenticateUserEmployeeService';

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password, type_user } = request.body;

        if(type_user === 'master') {
            const authenticateUser = container.resolve(AuthenticateUserService);

            const { user, token } = await authenticateUser.execute({
                email,
                password,
            });
    
            return response.json({ user: classToClass(user), token });
        } else {
            const authenticateUser = container.resolve(AuthenticateUserEmployeeService);

            const { user, token } = await authenticateUser.execute({
                email,
                password,
            });
    
            return response.json({ user: classToClass(user), token });
        }
    }
}