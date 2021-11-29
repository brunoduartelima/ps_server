import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindJobDetailsController from '../controllers/FindJobDetailsController';

const detailsJobsRouter = Router();
const findJobDetailsController = new FindJobDetailsController();

detailsJobsRouter.use(ensureAuthenticated);

detailsJobsRouter.get('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    findJobDetailsController.index
);

export default detailsJobsRouter;