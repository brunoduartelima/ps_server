import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersEmployeesController from '../controllers/UsersEmployeesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import accessPermissions from '@modules/users/infra/http/middlewares/accessPermissions';

const usersEmployeesRouter = Router();
const usersEmployeesController = new UsersEmployeesController();

usersEmployeesRouter.use(accessPermissions)
usersEmployeesRouter.use(ensureAuthenticated);

usersEmployeesRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            employee_id: Joi.string().uuid().required(),
        }
    }), 
    usersEmployeesController.create
);

export default usersEmployeesRouter;