import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FindEmployeeController from '../controllers/FindEmployeeController';

const searchEmployeesRouter = Router();
const searchEmployeesController = new FindEmployeeController();

searchEmployeesRouter.use(ensureAuthenticated);

searchEmployeesRouter.get('/', searchEmployeesController.index);

export default searchEmployeesRouter;