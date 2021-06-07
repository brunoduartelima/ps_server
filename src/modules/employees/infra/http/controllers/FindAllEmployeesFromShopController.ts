import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllEmployeesFromShopService from '@modules/employees/services/FindAllEmployeesFromShopService';

export default class FindAllEmployeesFromShopController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { page = 1 } = request.query;

        const findEmployees = container.resolve(FindAllEmployeesFromShopService);

        const employees = await findEmployees.execute({ shop_id, page: Number(page) });

        return response.json(employees);
    }
}