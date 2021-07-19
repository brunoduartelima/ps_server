import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// import FindFinancialByNameController from '@modules/financials/infra/http/controllers/FindFinancialByNameController';
import FindAllFinancialsFromCompanyController from '../controllers/FindAllFinancialsFromComapnyController';

const searchFinancialsRouter = Router();
// const findFinancialByNameController = new FindFinancialByNameController();
const findAllFinancialsFromCompanyController = new FindAllFinancialsFromCompanyController();

searchFinancialsRouter.use(ensureAuthenticated);

// searchFinancialsRouter.get('/', 
//     celebrate({
//         [Segments.QUERY]: {
//             name: Joi.string().required(),
//         }
//     }),
//     findFinancialByNameController.index
// );

searchFinancialsRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllFinancialsFromCompanyController.index
);

export default searchFinancialsRouter;