import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import 'shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errors());

app.use(
    (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }

        console.error(error);

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);


app.listen(3333, () => {
    console.log('1, 2, 3, testando!');
});