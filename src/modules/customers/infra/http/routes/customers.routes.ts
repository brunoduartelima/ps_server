import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CustomersController from '../controllers/CustomersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(ensureAuthenticated);

customersRouter.get('/', customersController.index);

customersRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(), 
            cpf: Joi.string().required(), 
            address: Joi.string().required(), 
            addressNumber: Joi.string().required(), 
            neighborhood: Joi.string().required(), 
            cep: Joi.string().required(), 
            sex: Joi.string().required(), 
            phone: Joi.string().required(),
            dateBirth: Joi.date().required(),
            email: Joi.string(),
        }
    }), 
    customersController.create
);

customersRouter.put('/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(), 
            cpf: Joi.string().required(), 
            address: Joi.string().required(), 
            addressNumber: Joi.string().required(), 
            neighborhood: Joi.string().required(), 
            cep: Joi.string().required(), 
            sex: Joi.string().required(), 
            phone: Joi.string().required(),
            dateBirth: Joi.date().required(),
            email: Joi.string(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }), 
    customersController.update
);

customersRouter.delete('/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    customersController.delete
);

customersRouter.put('/restore/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        }
    }),
    customersController.restore
);

export default customersRouter;