import { Request, Response } from 'express';
import { container } from 'tsyringe';

// import FindNewlyAddFinancialsService from '@modules/financials/services/FindNewlyAddFinancialsService';
import CreateFinancialService from '@modules/financials/services/CreateFinancialService';
import UpdateFinancialService from '@modules/financials/services/UpdateFinancialService';
// import DeleteFinancialService from '@modules/financials/services/DeleteFinancialService';
// import RestoreFinancialService from '@modules/financials/services/RestoreFinancialService';

export default class FinancialsController {
    // public async index(request: Request, response: Response): Promise<Response> {
    //     const { company_id } = request.token;

    //     const findFinancials = container.resolve(FindNewlyAddFinancialsService);

    //     const products = await findProducts.execute({ company_id });

    //     return response.json(products);

    // }

    public async create(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const {             
            title, 
            type,
            description, 
            value, 
            parcel_mount, 
            due_date, 
            active 
        } = request.body;

        const createFinancial = container.resolve(CreateFinancialService);

        const financial = await createFinancial.execute({
            title, 
            type,
            description, 
            value, 
            parcel_mount, 
            due_date, 
            active, 
            company_id
        });

        return response.json(financial);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { id } = request.params;
        const {             
            title, 
            type,
            description, 
            value, 
            parcel_mount, 
            due_date, 
            active 
        } = request.body;

        const updateFinancial = container.resolve(UpdateFinancialService);

        const financial = await updateFinancial.execute({
            id,
            title, 
            type,
            description, 
            value, 
            parcel_mount, 
            due_date, 
            active, 
            company_id
        });

        return response.json(financial);
    }

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