import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(express.json());
app.use(routes);


app.listen(3333, () => {
    console.log('1, 2, 3, testando!');
});