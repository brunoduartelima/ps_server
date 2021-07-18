import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// import FindSaleByNameController from '@modules/sales/infra/http/controllers/FindSaleByNameController';
import FindAllSalesFromCompanyController from '../controllers/FindAllSalesFromComapnyController';

const searchSalesRouter = Router();
// const findSaleByNameController = new FindSaleByNameController();
const findAllSalesFromCompanyController = new FindAllSalesFromCompanyController();

searchSalesRouter.use(ensureAuthenticated);

// searchSalesRouter.get('/', 
//     celebrate({
//         [Segments.QUERY]: {
//             name: Joi.string().required(),
//         }
//     }),
//     findSaleByNameController.index
// );

searchSalesRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllSalesFromCompanyController.index
);

export default searchSalesRouter;