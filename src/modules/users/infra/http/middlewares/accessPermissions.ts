import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface TokenPayload {
    access_level: string;
}

export default function accessPermissions(
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

        const { access_level } = decoded as TokenPayload;

        if(access_level !== 'master')
            throw new AppError('Access denied');

        return next();
    } catch {
        throw new AppError('Access denied. Out of your permissions', 401);
    }
}