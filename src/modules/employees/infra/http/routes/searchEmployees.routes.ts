import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FindEmployeeController from '../controllers/FindEmployeeController';
import FindEmployeeByNameController from '@modules/employees/infra/http/controllers/FindEmployeeByNameController';

const searchEmployeesRouter = Router();
const findAllEmployeesController = new FindEmployeeController();
const findEmployeeByNameController = new FindEmployeeByNameController();

searchEmployeesRouter.use(ensureAuthenticated);

searchEmployeesRouter.get('/list-all', findAllEmployeesController.index);

searchEmployeesRouter.get('/', findEmployeeByNameController.index);

export default searchEmployeesRouter;