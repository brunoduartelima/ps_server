import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import EmployeesController from '../controllers/EmployeesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const employeesRouter = Router();
const employeesController = new EmployeesController();

employeesRouter.use(ensureAuthenticated);

employeesRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            salary: Joi.number().required(),
            date_birth: Joi.date().required(),
            phone: Joi.string().required(),
            active: Joi.boolean().required(),
        }
    }), 
    employeesController.create
);

employeesRouter.put('/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            salary: Joi.number().required(),
            date_birth: Joi.date().required(),
            phone: Joi.string().required(),
            active: Joi.boolean().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }), 
    employeesController.update
);

employeesRouter.delete('/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    employeesController.delete);

export default employeesRouter;