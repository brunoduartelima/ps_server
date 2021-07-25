import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import accessPermissions from '@modules/users/infra/http/middlewares/accessPermissions';

import FindEmployeeByNameController from '@modules/employees/infra/http/controllers/FindEmployeeByNameController';
import FindAllEmployeesFromCompanyController from '../controllers/FindAllEmployeesFromCompanyController';

const searchEmployeesRouter = Router();
const findEmployeeByNameController = new FindEmployeeByNameController();
const findAllEmployeesFromCompanyController = new FindAllEmployeesFromCompanyController();

searchEmployeesRouter.use(ensureAuthenticated);
searchEmployeesRouter.use(accessPermissions);

searchEmployeesRouter.get('/', 
    celebrate({
        [Segments.QUERY]: {
            name: Joi.string().required(),
        }
    }),
    findEmployeeByNameController.index
);

searchEmployeesRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllEmployeesFromCompanyController.index
);

export default searchEmployeesRouter;