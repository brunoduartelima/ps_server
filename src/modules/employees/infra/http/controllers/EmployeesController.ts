import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllEmployeesFromShopService from '@modules/employees/services/FindAllEmployeesFromShopService';
import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';
import UpdateEmployeeService from '@modules/employees/services/UpdateEmployeeService';
import DeleteEmployeeService from '@modules/employees/services/DeleteEmployeeService';

export default class EmployeesController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { page = 1 } = request.query;

        const findEmployees = container.resolve(FindAllEmployeesFromShopService);

        const employees = await findEmployees.execute({ shop_id, page: Number(page) });

        return response.json(employees);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { name, salary, date_birth, phone, active } = request.body;

        const createEmployee = container.resolve(CreateEmployeeService);

        const employee = await createEmployee.execute({
            name, 
            salary, 
            date_birth, 
            phone,
            active, 
            shop_id
        });

        return response.json(employee);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, salary, date_birth, phone,active } = request.body;

        const updateEmployee = container.resolve(UpdateEmployeeService);

        const employee = await updateEmployee.execute({
            id,
            name,
            salary,
            date_birth, 
            phone,
            active
        });

        return response.json(employee);
    }

    public async delete(request: Request, response: Response): Promise<void> {
        const { id } = request.params;

        const deleteEmployee = container.resolve(DeleteEmployeeService);

        await deleteEmployee.execute({ id });

        response.status(200).send();
    }
}