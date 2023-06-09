import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import RestoreCustomerService from '@modules/customers/services/RestoreCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import FindNewlyAddCustomersService from '@modules/customers/services/FindNewlyAddCustomersService';

export default class CustomersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { idCompany } = request.token;

        const findCustomers = container.resolve(FindNewlyAddCustomersService);

        const customers = await findCustomers.execute({ idCompany });

        return response.json(customers);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { idCompany } = request.token;
        const { 
            name, 
            cpf, 
            address, 
            addressNumber, 
            neighborhood, 
            cep, 
            sex, 
            phone,
            dateBirth,
            email 
        } = request.body;

        const createCustomer = container.resolve(CreateCustomerService);

        const customer = await createCustomer.execute({
            name, 
            cpf, 
            address, 
            addressNumber, 
            neighborhood, 
            cep, 
            sex, 
            phone,
            dateBirth,
            email,
            idCompany
        });

        return response.json(customer);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { idCompany } = request.token;
        const { id } = request.params;
        const {         
            name, 
            cpf, 
            address, 
            addressNumber, 
            neighborhood, 
            cep, 
            sex, 
            phone, 
            dateBirth, 
            email,
        } = request.body;

        const updateCustomer = container.resolve(UpdateCustomerService);

        const customer = await updateCustomer.execute({
            id,
            name, 
            cpf, 
            address, 
            addressNumber, 
            neighborhood, 
            cep, 
            sex, 
            phone, 
            dateBirth, 
            email, 
            idCompany
        });

        return response.json(customer);
    }

    public async delete(request: Request, response: Response): Promise<void> {
        const { idCompany } = request.token;
        const { id } = request.params;

        const deleteCustomer = container.resolve(DeleteCustomerService);

        await deleteCustomer.execute({ id, idCompany });

        response.status(200).send();
    }

    public async restore(request: Request, response: Response): Promise<void> {
        const { idCompany } = request.token;
        const { id } = request.params;

        const restoreCustomer = container.resolve(RestoreCustomerService);

        await restoreCustomer.execute({ id, idCompany });

        response.status(200).send();
    }
}