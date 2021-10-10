import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindAllCustomersFromCompanyController from '../controllers/FindAllCustomersFromCompanyController';
import FindCustomerByNameController from '../controllers/FindCustomerByNameController';

const searchCustomersRouter = Router();
const findCustomerByNameController = new FindCustomerByNameController();
const findAllCustomersFromCompanyController = new FindAllCustomersFromCompanyController();

searchCustomersRouter.use(ensureAuthenticated);

searchCustomersRouter.get('/', 
    celebrate({
        [Segments.QUERY]: {
            name: Joi.string().required(),
            page: Joi.number().required()
        }
    }),
    findCustomerByNameController.index
);

searchCustomersRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllCustomersFromCompanyController.index
);

export default searchCustomersRouter;