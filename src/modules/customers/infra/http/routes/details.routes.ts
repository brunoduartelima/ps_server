import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindCustomerDetailsController from '../controllers/FindCustomerDetailsController';

const detailsCustomersRouter = Router();
const findCustomerDetailsController = new FindCustomerDetailsController();

detailsCustomersRouter.use(ensureAuthenticated);

detailsCustomersRouter.get('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    findCustomerDetailsController.index
);

export default detailsCustomersRouter;