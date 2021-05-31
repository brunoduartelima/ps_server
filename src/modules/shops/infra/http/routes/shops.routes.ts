import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ShopsController from '../controllers/ShopsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const shopsRouter = Router();
const shopsController = new ShopsController();

shopsRouter.use(ensureAuthenticated);

shopsRouter.post('/:user_id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            company_type: Joi.string().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
            user_id: Joi.string().uuid().required(),
        }
    }), 
    shopsController.create
);

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