import { Router } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        const { name, cpf, phone, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            cpf,
            phone,
            email,
            password,
        });

        return response.json(user);

    } catch (error) {
        
    }
})

export default usersRouter;