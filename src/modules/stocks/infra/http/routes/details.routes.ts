import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindStockDetailsController from '../controllers/FindStockDetailsController';

const detailsStocksRouter = Router();
const findStockDetailsController = new FindStockDetailsController();

detailsStocksRouter.use(ensureAuthenticated);

detailsStocksRouter.get('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    findStockDetailsController.index
);

export default detailsStocksRouter;