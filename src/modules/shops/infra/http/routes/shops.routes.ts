import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ShopsController from '../controllers/ShopsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const shopsRouter = Router();
const shopsController = new ShopsController();

shopsRouter.post('/:user_id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            company_type: Joi.string().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
        },
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        }
    }), 
    shopsController.create
);

shopsRouter.use(ensureAuthenticated);

shopsRouter.get('/', shopsController.index);

shopsRouter.put('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            company_type: Joi.string().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
        }
    }), 
    shopsController.update
);
export default shopsRouter;