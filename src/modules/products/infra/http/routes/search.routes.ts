import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindProductByNameController from '@modules/products/infra/http/controllers/FindProductByNameController';
import FindAllProductsFromCompanyController from '../controllers/FindAllProductsFromComapnyController';

const searchProductsRouter = Router();
const findProductByNameController = new FindProductByNameController();
const findAllProductsFromCompanyController = new FindAllProductsFromCompanyController();

searchProductsRouter.use(ensureAuthenticated);

searchProductsRouter.get('/', 
    celebrate({
        [Segments.QUERY]: {
            name: Joi.string().required(),
            page: Joi.number().required()
        }
    }),
    findProductByNameController.index
);

searchProductsRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllProductsFromCompanyController.index
);

export default searchProductsRouter;