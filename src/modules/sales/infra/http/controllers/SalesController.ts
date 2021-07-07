import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindNewlyAddSalesService from '@modules/sales/services/FindNewlyAddSalesService';
import CreateSaleService from '@modules/sales/services/CreateSaleService';
// import UpdateSaleService from '@modules/sales/services/UpdateSaleService';
// import DeleteSaleService from '@modules/sales/services/DeleteSaleService';
// import RestoreSaleService from '@modules/sales/services/RestoreSaleService';

export default class SalessController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;

        const findSales = container.resolve(FindNewlyAddSalesService);

        const sales = await findSales.execute({ company_id });

        return response.json(sales);

    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const {   
            type, 
            description, 
            date,
            customer_id, 
            employees, 
            products, 
            jobs } = request.body;

        const createSale = container.resolve(CreateSaleService);

        const sale = await createSale.execute({
            type, 
            description, 
            date,
            customer_id, 
            employees, 
            products, 
            jobs, 
            company_id
        });

        return response.json(sale);
    }

    // public async update(request: Request, response: Response): Promise<Response> {
    //     const { company_id } = request.token;
    //     const { id } = request.params;
    //     const { name, code, description, price, quantity, average_cost, } = request.body;

    //     const updateProduct = container.resolve(UpdateProductService);

    //     const product = await updateProduct.execute({
    //         id,
    //         name, 
    //         code, 
    //         description, 
    //         price, 
    //         quantity, 
    //         average_cost, 
    //         company_id
    //     });

    //     return response.json(product);
    // }

    // public async delete(request: Request, response: Response): Promise<void> {
    //     const { company_id } = request.token;
    //     const { id } = request.params;

    //     const deleteProduct = container.resolve(DeleteProductService);

    //     await deleteProduct.execute({ id, company_id });

    //     response.status(200).send();
    // }

    // public async restore(request: Request, response: Response): Promise<void> {
    //     const { company_id } = request.token;
    //     const { id } = request.params;

    //     const restoreProduct = container.resolve(RestoreProductService);

    //     await restoreProduct.execute({ id, company_id });

    //     response.status(200).send();
    // }
}