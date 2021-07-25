import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CompaniesController from '../controllers/CompaniesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import accessPermissions from '@modules/users/infra/http/middlewares/accessPermissions';

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.post('/:user_id',
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
    companiesController.create
);

companiesRouter.use(ensureAuthenticated);
companiesRouter.use(accessPermissions);

companiesRouter.get('/', companiesController.index);

companiesRouter.put('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            company_type: Joi.string().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
        }
    }), 
    companiesController.update
);
export default companiesRouter;