import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import StocksController from '../controllers/StocksController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const stockRouter = Router();
const stockController = new StocksController();

stockRouter.use(ensureAuthenticated);

stockRouter.get('/', stockController.index);

stockRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            value: Joi.number().required(),
            type: Joi.string().required(),
            supplier: Joi.string().required(),
            description: Joi.string().allow(''),
            date: Joi.date().required(),
            quantity: Joi.number().integer().required(),
            product_id: Joi.string().uuid().required()
        }
    }), 
    stockController.create
);

stockRouter.put('/:id',
    celebrate({
        [Segments.BODY]: {
            value: Joi.number().required(),
            type: Joi.string().required(),
            supplier: Joi.string().required(),
            description: Joi.string().allow(''),
            date: Joi.date().required(),
            quantity: Joi.number().integer().required(),
            product_id: Joi.string().uuid().required()
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }), 
    stockController.update
);

stockRouter.delete('/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    stockController.delete
);

stockRouter.put('/restore/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    stockController.restore
);

export default stockRouter;