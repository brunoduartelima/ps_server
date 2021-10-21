import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import accessPermissions from '@modules/users/infra/http/middlewares/accessPermissions';

import FindAllUsersEmployeesFromComapnyController from '../controllers/FindAllUsersEmployeesFromComapnyController';

const searchUsersEmployeesRouter = Router();
const findAllUsersEmployeesFromComapnyController = new FindAllUsersEmployeesFromComapnyController();

searchUsersEmployeesRouter.use(ensureAuthenticated);
searchUsersEmployeesRouter.use(accessPermissions);

searchUsersEmployeesRouter.get('/',
    findAllUsersEmployeesFromComapnyController.index
);

export default searchUsersEmployeesRouter;