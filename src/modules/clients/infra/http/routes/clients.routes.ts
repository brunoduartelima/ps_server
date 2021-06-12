import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ClientsController from '../controllers/ClientsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.use(ensureAuthenticated);

clientsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(), 
            cpf: Joi.string().required(), 
            address: Joi.string().required(), 
            address_number: Joi.string().required(), 
            neighborhood: Joi.string().required(), 
            cep: Joi.string().required(), 
            sex: Joi.string().required(), 
            phone: Joi.string().required(),
            date_birth: Joi.date().required(),
            email: Joi.string().required(),
        }
    }), 
    clientsController.create
);

clientsRouter.delete('/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    clientsController.delete
);

clientsRouter.put('/restore/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    clientsController.restore
);

export default clientsRouter;