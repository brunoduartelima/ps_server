import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindNewlyAddStocksService from '@modules/stocks/services/FindNewlyAddStocksService';
import CreateStockService from '@modules/stocks/services/CreateStockService';
import UpdateStockService from '@modules/stocks/services/UpdateStockService';
import DeleteStockService from '@modules/stocks/services/DeleteStockService';
import RestoreStockService from '@modules/stocks/services/RestoreStockService';

export default class StocksController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;

        const findStocks = container.resolve(FindNewlyAddStocksService);

        const stocks = await findStocks.execute({ company_id });

        return response.json(stocks);

    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { value, type, supplier, description, quantity, date, product_id } = request.body;

        const createStock = container.resolve(CreateStockService);

        const stock = await createStock.execute({
            value, 
            type, 
            supplier, 
            description, 
            quantity, 
            date, 
            company_id, 
            product_id
        });

        return response.json(stock);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { id } = request.params;
        const { value, type, supplier, description, quantity, date, product_id } = request.body;

        const updateStock = container.resolve(UpdateStockService);

        const stock = await updateStock.execute({
            id,
            value, 
            type, 
            supplier, 
            description, 
            quantity, 
            date, 
            company_id, 
            product_id
        });

        return response.json(stock);
    }

    public async delete(request: Request, response: Response): Promise<void> {
        const { company_id } = request.token;
        const { id } = request.params;

        const deleteStock = container.resolve(DeleteStockService);

        await deleteStock.execute({ id, company_id });

        response.status(200).send();
    }

    public async restore(request: Request, response: Response): Promise<void> {
        const { company_id } = request.token;
        const { id } = request.params;

        const restoreStock = container.resolve(RestoreStockService);

        await restoreStock.execute({ id, company_id });

        response.status(200).send();
    }
}