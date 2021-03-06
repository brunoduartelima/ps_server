import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
    user: string;
    access_level: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) 
        throw new AppError('JWT token is missing', 401);

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub, user, access_level } = decoded as TokenPayload;

        request.token = {
            user_id: user,
            company_id: sub,
            access_level: access_level
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}