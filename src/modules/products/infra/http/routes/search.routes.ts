import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindProductByNameController from '@modules/products/infra/http/controllers/FindProductByNameController';
import FindAllProductsFromShopController from '../controllers/FindAllProductsFromShopController';

const searchProductsRouter = Router();
const findProductByNameController = new FindProductByNameController();
const findAllProductsFromShopController = new FindAllProductsFromShopController();

searchProductsRouter.use(ensureAuthenticated);

searchProductsRouter.get('/', 
    celebrate({
        [Segments.QUERY]: {
            name: Joi.string().required(),
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
    findAllProductsFromShopController.index
);

export default searchProductsRouter;