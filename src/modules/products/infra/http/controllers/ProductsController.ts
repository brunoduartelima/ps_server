import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindNewlyAddProductsService from '@modules/products/services/FindNewlyAddProductsService';
import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import RestoreProductService from '@modules/products/services/RestoreProductService';

export default class ProductsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;

        const findProducts = container.resolve(FindNewlyAddProductsService);

        const products = await findProducts.execute({ shop_id });

        return response.json(products);

    }

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

    public async update(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { id } = request.params;
        const { name, code, description, price, quantity, average_cost, } = request.body;

        const updateProduct = container.resolve(UpdateProductService);

        const product = await updateProduct.execute({
            id,
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

    public async delete(request: Request, response: Response): Promise<void> {
        const { shop_id } = request.token;
        const { id } = request.params;

        const deleteProduct = container.resolve(DeleteProductService);

        await deleteProduct.execute({ id, shop_id });

        response.status(200).send();
    }

    public async restore(request: Request, response: Response): Promise<void> {
        const { shop_id } = request.token;
        const { id } = request.params;

        const restoreProduct = container.resolve(RestoreProductService);

        await restoreProduct.execute({ id, shop_id });

        response.status(200).send();
    }
}