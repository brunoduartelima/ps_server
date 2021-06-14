import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindAllClientsFromShopController from '../controllers/FindAllClientsFromShopController';
import FindClientByNameController from '../controllers/FindClientByNameController';

const searchClientsRouter = Router();
const findClientByNameController = new FindClientByNameController();
const findAllClientsFromShopController = new FindAllClientsFromShopController();

searchClientsRouter.use(ensureAuthenticated);

searchClientsRouter.get('/', 
    celebrate({
        [Segments.QUERY]: {
            name: Joi.string().required(),
        }
    }),
    findClientByNameController.index
);

searchClientsRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllClientsFromShopController.index
);

export default searchClientsRouter;