import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import accessPermissions from '@modules/users/infra/http/middlewares/accessPermissions';

import FindAllUsersEmployeesFromComapnyController from '../controllers/FindAllUsersEmployeesFromComapnyController';

const searchUsersEmployeesRouter = Router();
const findAllUsersEmployeesFromComapnyController = new FindAllUsersEmployeesFromComapnyController();

searchUsersEmployeesRouter.use(ensureAuthenticated);
searchUsersEmployeesRouter.use(accessPermissions);

searchUsersEmployeesRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllUsersEmployeesFromComapnyController.index
);

export default searchUsersEmployeesRouter;