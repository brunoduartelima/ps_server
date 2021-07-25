import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import ResetPasswordUserEmployeeService from '@modules/users_employees/services/ResetPasswordUserEmployeeService';

export default class ResetPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { password, token, type_user } = request.body;

        if(type_user === 'master') {
            const resetPassword = container.resolve(ResetPasswordService);

            await resetPassword.execute({
               password,
               token
           });
   
           return response.status(204).json();
        } else {
            const resetPassword = container.resolve(ResetPasswordUserEmployeeService);

            await resetPassword.execute({
               password,
               token
           });
   
           return response.status(204).json();
        }
    }
}