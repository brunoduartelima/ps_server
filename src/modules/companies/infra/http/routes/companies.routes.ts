import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CompaniesController from '../controllers/CompaniesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import accessPermissions from '@modules/users/infra/http/middlewares/accessPermissions';

const companiesRouter = Router();
const companiesController = new CompaniesController();

companiesRouter.post('/:idUser',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            companyType: Joi.string().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
        },
        [Segments.PARAMS]: {
            idUser: Joi.string().uuid().required(),
        }
    }), 
    companiesController.create
);

companiesRouter.get('/', accessPermissions, ensureAuthenticated, companiesController.index);

companiesRouter.put('/',
    accessPermissions, 
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            companyType: Joi.string().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
        }
    }), 
    companiesController.update
);
export default companiesRouter;