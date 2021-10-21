import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersEmployeesController from '../controllers/UsersEmployeesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import accessPermissions from '@modules/users/infra/http/middlewares/accessPermissions';

const usersEmployeesRouter = Router();
const usersEmployeesController = new UsersEmployeesController();

usersEmployeesRouter.use(accessPermissions);
usersEmployeesRouter.use(ensureAuthenticated);

usersEmployeesRouter.put('/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.when('old_password', {
            is: Joi.exist(),
            then: Joi.required(),
            }),
            password_confirmation: Joi.when('password', {
            is: Joi.exist(),
            then: Joi.valid(Joi.ref('password')).required(),
            }),
        },
    }),
    usersEmployeesController.update
);

usersEmployeesRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            employee_id: Joi.string().uuid().required(),
        }
    }), 
    usersEmployeesController.create
);

usersEmployeesRouter.delete('/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    usersEmployeesController.delete
);



export default usersEmployeesRouter;