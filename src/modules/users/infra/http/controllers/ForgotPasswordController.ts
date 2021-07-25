import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import SendForgotPasswordUserEmployeeEmailService from '@modules/users_employees/services/SendForgotPasswordUserEmployeeEmailService';

export default class ForgotPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, type_user } = request.body;

        if(type_user === 'master') {
            const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);

            await sendForgotPasswordEmail.execute({
               email
           });
   
           return response.status(204).json();
        } else {
            const sendForgotPasswordEmail = container.resolve(SendForgotPasswordUserEmployeeEmailService);

            await sendForgotPasswordEmail.execute({
               email
           });
   
           return response.status(204).json();
        }
    }
}