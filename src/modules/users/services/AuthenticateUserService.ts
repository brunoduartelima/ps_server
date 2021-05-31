import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IShopsRepository from '@modules/shops/repositories/IShopsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';
import Shop from '@modules/shops/infra/typeorm/entities/Shop';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    shop: Shop;
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('ShopsRepository')
        private shopsRepository: IShopsRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user)
            throw new AppError('Incorrect email/password combination.', 401);
                
        const shop = await this.shopsRepository.findShop(user.id);
        
        if (!shop)
            throw new AppError('Incorrect user logon combination.', 401);

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!passwordMatched)
            throw new AppError('Incorrect email/password combination.', 401);

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ user: user.id }, secret, {
            subject: shop.id,
            expiresIn,
        });

        return {
            shop,
            user,
            token,
        };
    }
}

export default AuthenticateUserService;