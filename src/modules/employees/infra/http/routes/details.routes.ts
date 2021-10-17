import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindEmployeeDetailsController from '../controllers/FindEmployeeDetailsController';

const detailsEmployeesRouter = Router();
const findEmployeeDetailsController = new FindEmployeeDetailsController();

detailsEmployeesRouter.use(ensureAuthenticated);

detailsEmployeesRouter.get('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    findEmployeeDetailsController.index
);

export default detailsEmployeesRouter;