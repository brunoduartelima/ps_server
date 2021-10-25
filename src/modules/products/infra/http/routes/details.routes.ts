import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindProductDetailsController from '../controllers/FindProductDetailsController';

const detailsProductsRouter = Router();
const findProductDetailsController = new FindProductDetailsController();

detailsProductsRouter.use(ensureAuthenticated);

detailsProductsRouter.get('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    findProductDetailsController.index
);

export default detailsProductsRouter;