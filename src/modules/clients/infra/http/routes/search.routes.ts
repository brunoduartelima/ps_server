import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindAllClientsFromShopController from '../controllers/FindAllClientsFromShopController';

const searchClientsRouter = Router();
// const findEmployeeByNameController = new FindEmployeeByNameController();
const findAllClientsFromShopController = new FindAllClientsFromShopController();

searchClientsRouter.use(ensureAuthenticated);

// searchClientsRouter.get('/', 
//     celebrate({
//         [Segments.QUERY]: {
//             name: Joi.string().required(),
//         }
//     }),
//     findEmployeeByNameController.index
// );

searchClientsRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllClientsFromShopController.index
);

export default searchClientsRouter;