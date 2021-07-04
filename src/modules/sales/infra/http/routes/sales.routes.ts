import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import SalesController from '../controllers/SalesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const saleRouter = Router();
const saleController = new SalesController();

saleRouter.use(ensureAuthenticated);

// saleRouter.get('/', saleController.index);

saleRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            type: Joi.string().required(),
            description: Joi.string(),
            date: Joi.date().required(),
            employees: Joi.array(),
            products: Joi.array(),
            jobs: Joi.array(),
            customer_id: Joi.string().uuid(),
        }
    }),
    saleController.create
);

// saleRouter.put('/:id',
//     celebrate({
//         [Segments.BODY]: {
//             name: Joi.string().required(),
//             code: Joi.string(), 
//             description: Joi.string(),
//             price: Joi.number().required(),
//             quantity: Joi.number().integer().required(),
//             average_cost: Joi.number().required(),
//         },
//         [Segments.PARAMS]: {
//             id: Joi.string().uuid().required(),
//         }
//     }), 
//     saleController.update
// );

// saleRouter.delete('/:id', 
//     celebrate({
//         [Segments.PARAMS]: {
//             id: Joi.string().uuid().required(),
//         }
//     }),
//     saleController.delete
// );

// saleRouter.put('/restore/:id',
//     celebrate({
//         [Segments.PARAMS]: {
//             id: Joi.string().uuid().required(),
//         }
//     }),
//     saleController.restore
// );

export default saleRouter;