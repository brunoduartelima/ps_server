import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProductsController from '../controllers/ProductsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const productRouter = Router();
const productController = new ProductsController();

productRouter.use(ensureAuthenticated);

productRouter.get('/', productController.index);

productRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            code: Joi.string().allow(''), 
            description: Joi.string().allow(''),
            price: Joi.number().required(),
            quantity: Joi.number().integer().required(),
            average_cost: Joi.number().required(),
        }
    }), 
    productController.create
);

productRouter.put('/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            code: Joi.string().allow(''), 
            description: Joi.string().allow(''),
            price: Joi.number().required(),
            quantity: Joi.number().integer().required(),
            average_cost: Joi.number().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }), 
    productController.update
);

productRouter.delete('/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    productController.delete
);

productRouter.put('/restore/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    productController.restore
);

export default productRouter;