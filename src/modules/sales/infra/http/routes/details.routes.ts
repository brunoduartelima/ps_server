import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindSaleDetailsController from '../controllers/FindSaleDetailsController';

const detailsSalesRouter = Router();
const findSaleDetailsController = new FindSaleDetailsController();

detailsSalesRouter.use(ensureAuthenticated);

detailsSalesRouter.get('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    findSaleDetailsController.index
);

export default detailsSalesRouter;