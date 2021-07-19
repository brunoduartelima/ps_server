import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindFinancialByTitleController from '@modules/financials/infra/http/controllers/FindFinancialByTitleController';
import FindAllFinancialsFromCompanyController from '../controllers/FindAllFinancialsFromComapnyController';

const searchFinancialsRouter = Router();
const findFinancialByTitleController = new FindFinancialByTitleController();
const findAllFinancialsFromCompanyController = new FindAllFinancialsFromCompanyController();

searchFinancialsRouter.use(ensureAuthenticated);

searchFinancialsRouter.get('/', 
    celebrate({
        [Segments.QUERY]: {
            title: Joi.string().required(),
        }
    }),
    findFinancialByTitleController.index
);

searchFinancialsRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllFinancialsFromCompanyController.index
);

export default searchFinancialsRouter;