import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FindAllStocksFromCompanyController from '../controllers/FindAllStocksFromComapnyController';

const searchStocksRouter = Router();
const findAllStocksFromCompanyController = new FindAllStocksFromCompanyController();

searchStocksRouter.use(ensureAuthenticated);

searchStocksRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllStocksFromCompanyController.index
);

export default searchStocksRouter;