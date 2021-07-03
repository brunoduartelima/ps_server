import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FindJobByNameController from '@modules/jobs/infra/http/controllers/FindJobByNameController';
import FindAllJobsFromCompanyController from '../controllers/FindAllJobsFromComapnyController';

const searchJobsRouter = Router();
const findJobByNameController = new FindJobByNameController();
const findAllJobsFromCompanyController = new FindAllJobsFromCompanyController();

searchJobsRouter.use(ensureAuthenticated);

searchJobsRouter.get('/', 
    celebrate({
        [Segments.QUERY]: {
            name: Joi.string().required(),
        }
    }),
    findJobByNameController.index
);

searchJobsRouter.get('/list-all',     
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().required(),
        }
    }),
    findAllJobsFromCompanyController.index
);

export default searchJobsRouter;