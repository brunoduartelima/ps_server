import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import EmployeesRepository from '@modules/employees/infra/typeorm/repositories/EmployeesRepository';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IJobsRepository from '@modules/jobs/repositories/IJobsRepository';
import JobsRepository from '@modules/jobs/infra/typeorm/repositories/JobsRepository';

import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import SalesRepository from '@modules/sales/infra/typeorm/repositories/SalesRepository';

import ISalesRelationshipsRepository from '@modules/sales/repositories/ISalesRelationshipsRepository';
import SalesRelationshipsRepository from '@modules/sales/infra/typeorm/repositories/SalesRelationshipsRepository';

import IFinancialsRepository from '@modules/financials/repositories/IFinancialsRepository';
import FinancialsRepository from '@modules/financials/infra/typeorm/repositories/FinancialsRepository';

import IUsersEmployeesRepository from '@modules/users_employees/repositories/IUsersEmployeesRepository';
import UsersEmployeesRepository from '@modules/users_employees/infra/typeorm/repositories/UsersEmployeesRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);

container.registerSingleton<ICompaniesRepository>('CompaniesRepository', CompaniesRepository);

container.registerSingleton<IEmployeesRepository>('EmployeesRepository', EmployeesRepository);

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);

container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository);

container.registerSingleton<IJobsRepository>('JobsRepository', JobsRepository);

container.registerSingleton<ISalesRepository>('SalesRepository', SalesRepository);

container.registerSingleton<ISalesRelationshipsRepository>('SalesRelationshipsRepository', SalesRelationshipsRepository);

container.registerSingleton<IFinancialsRepository>('FinancialsRepository', FinancialsRepository);

container.registerSingleton<IUsersEmployeesRepository>('UsersEmployeesRepository', UsersEmployeesRepository);