import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import FinancialsController from '../controllers/FinancialsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const financialRouter = Router();
const financialController = new FinancialsController();

financialRouter.use(ensureAuthenticated);

// financialRouter.get('/', financialController.index);

financialRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            description: Joi.string(),
            value: Joi.number().required(),
            type: Joi.string().required(),
            parcel_mount: Joi.number().integer().required(),
            due_date: Joi.date().required(),
            active: Joi.boolean().required()
        }
    }), 
    financialController.create
);

financialRouter.put('/:id',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            description: Joi.string(),
            value: Joi.number().required(),
            type: Joi.string().required(),
            parcel_mount: Joi.number().integer().required(),
            due_date: Joi.date().required(),
            active: Joi.boolean().required()
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }), 
    financialController.update
);

// financialRouter.delete('/:id', 
//     celebrate({
//         [Segments.PARAMS]: {
//             id: Joi.string().uuid().required(),
//         }
//     }),
//     financialController.delete
// );

// financialRouter.put('/restore/:id',
//     celebrate({
//         [Segments.PARAMS]: {
//             id: Joi.string().uuid().required(),
//         }
//     }),
//     financialController.restore
// );

export default financialRouter;