import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IShopsRepository from '@modules/shops/repositories/IShopsRepository';
import ShopsRepository from '@modules/shops/infra/typeorm/repositories/ShopsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IShopsRepository>('ShopsRepository', ShopsRepository);

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);