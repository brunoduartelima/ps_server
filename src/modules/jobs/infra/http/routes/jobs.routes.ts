import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import JobsController from '../controllers/JobsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const jobRouter = Router();
const jobController = new JobsController();

jobRouter.use(ensureAuthenticated);

jobRouter.get('/', jobController.index);

jobRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(), 
            description: Joi.string(),
            price: Joi.number().required(),
            average_time: Joi.date().required(),
        }
    }),
    jobController.create
);

jobRouter.put('/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(), 
            description: Joi.string(),
            price: Joi.number().required(),
            average_time: Joi.date().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }), 
    jobController.update
);

jobRouter.delete('/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    jobController.delete
);

jobRouter.put('/restore/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    jobController.restore
);

export default jobRouter;