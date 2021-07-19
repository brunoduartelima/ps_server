import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';
import searchEmployeesRouter from '@modules/employees/infra/http/routes/search.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import searchCustomersRouter from '@modules/customers/infra/http/routes/search.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import searchProductsRouter from '@modules/products/infra/http/routes/search.routes';
import jobsRouter from '@modules/jobs/infra/http/routes/jobs.routes';
import searchJobsRouter from '@modules/jobs/infra/http/routes/search.routes';
import salesRouter from '@modules/sales/infra/http/routes/sales.routes';
import searchSalesRouter from '@modules/sales/infra/http/routes/search.routes';
import financialsRouter from '@modules/financials/infra/http/routes/financials.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);
routes.use('/companies', companiesRouter);
routes.use('/employees', employeesRouter);
routes.use('/employees/search', searchEmployeesRouter);
routes.use('/customers', customersRouter);
routes.use('/customers/search', searchCustomersRouter);
routes.use('/products', productsRouter);
routes.use('/products/search', searchProductsRouter);
routes.use('/jobs', jobsRouter);
routes.use('/jobs/search', searchJobsRouter);
routes.use('/sales', salesRouter);
routes.use('/sales/search', searchSalesRouter);
routes.use('/financials', financialsRouter);

export default routes;