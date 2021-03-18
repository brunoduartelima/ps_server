import express from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Teste' });
})

app.listen(3333, () => {
    console.log('1, 2, 3, testando!');
});