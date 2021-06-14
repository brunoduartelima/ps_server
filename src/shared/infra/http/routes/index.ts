import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import shopsRouter from '@modules/shops/infra/http/routes/shops.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';
import searchEmployeesRouter from '@modules/employees/infra/http/routes/search.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import searchClientsRouter from '@modules/clients/infra/http/routes/search.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);
routes.use('/shops', shopsRouter);
routes.use('/employees', employeesRouter);
routes.use('/employees/search', searchEmployeesRouter);
routes.use('/clients', clientsRouter);
routes.use('/clients/search', searchClientsRouter);
routes.use('/products', productsRouter);

export default routes;