import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindEmployeeByNameController from '@modules/employees/infra/http/controllers/FindEmployeeByNameController';
import FindAllEmployeesFromShopController from '../controllers/FindAllEmployeesFromShopController';

const searchEmployeesRouter = Router();
const findEmployeeByNameController = new FindEmployeeByNameController();
const findAllEmployeesFromShopController = new FindAllEmployeesFromShopController();

searchEmployeesRouter.use(ensureAuthenticated);

searchEmployeesRouter.get('/', findEmployeeByNameController.index);

searchEmployeesRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllEmployeesFromShopController.index
);

export default searchEmployeesRouter;