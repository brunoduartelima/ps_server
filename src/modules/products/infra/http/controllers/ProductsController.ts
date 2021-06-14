import { Request, Response } from 'express';
import { container } from 'tsyringe';

// import FindNewlyAddProductsService from '@modules/products/services/FindNewlyAddProductsService';
import CreateProductService from '@modules/products/services/CreateProductService';
// import UpdateProductService from '@modules/products/services/UpdateProductService';
// import DeleteProductService from '@modules/products/services/DeleteProductService';
// import RestoreProductService from '@modules/products/services/RestoreProductService';

export default class ProductsController {
    // public async index(request: Request, response: Response): Promise<Response> {
    //     const { shop_id } = request.token;

    //     const findEmployees = container.resolve(FindNewlyAddEmployeesService);

    //     const employees = await findEmployees.execute({ shop_id });

    //     return response.json(employees);

    // }

    public async create(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { name, code, description, price, quantity, average_cost } = request.body;

        const createProduct = container.resolve(CreateProductService);

        const product = await createProduct.execute({
            name, 
            code, 
            description, 
            price, 
            quantity, 
            average_cost, 
            shop_id
        });

        return response.json(product);
    }

    // public async update(request: Request, response: Response): Promise<Response> {
    //     const { shop_id } = request.token;
    //     const { id } = request.params;
    //     const { name, salary, date_birth, phone,active } = request.body;

    //     const updateEmployee = container.resolve(UpdateEmployeeService);

    //     const employee = await updateEmployee.execute({
    //         id,
    //         shop_id,
    //         name,
    //         salary,
    //         date_birth, 
    //         phone,
    //         active
    //     });

    //     return response.json(employee);
    // }

    // public async delete(request: Request, response: Response): Promise<void> {
    //     const { shop_id } = request.token;
    //     const { id } = request.params;

    //     const deleteEmployee = container.resolve(DeleteEmployeeService);

    //     await deleteEmployee.execute({ id, shop_id });

    //     response.status(200).send();
    // }

    // public async restore(request: Request, response: Response): Promise<void> {
    //     const { shop_id } = request.token;
    //     const { id } = request.params;

    //     const restoreEmployee = container.resolve(RestoreEmployeeService);

    //     await restoreEmployee.execute({ id, shop_id });

    //     response.status(200).send();
    // }
}