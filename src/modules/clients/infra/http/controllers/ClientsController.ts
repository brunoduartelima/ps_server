import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clients/services/CreateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';
import RestoreClientService from '@modules/clients/services/RestoreClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';

export default class ClientsController {
    // public async index(request: Request, response: Response): Promise<Response> {
    //     const { shop_id } = request.token;

    //     const findEmployees = container.resolve(FindNewlyAddEmployeesService);

    //     const employees = await findEmployees.execute({ shop_id });

    //     return response.json(employees);

    // }

    public async create(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { 
            name, 
            cpf, 
            address, 
            address_number, 
            neighborhood, 
            cep, 
            sex, 
            phone,
            date_birth,
            email 
        } = request.body;

        const createClient = container.resolve(CreateClientService);

        const client = await createClient.execute({
            name, 
            cpf, 
            address, 
            address_number, 
            neighborhood, 
            cep, 
            sex, 
            phone,
            date_birth,
            email,
            shop_id
        });

        return response.json(client);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { shop_id } = request.token;
        const { id } = request.params;
        const {         
            name, 
            cpf, 
            address, 
            address_number, 
            neighborhood, 
            cep, 
            sex, 
            phone, 
            date_birth, 
            email,
        } = request.body;

        const updateClient = container.resolve(UpdateClientService);

        const client = await updateClient.execute({
            id,
            name, 
            cpf, 
            address, 
            address_number, 
            neighborhood, 
            cep, 
            sex, 
            phone, 
            date_birth, 
            email, 
            shop_id
        });

        return response.json(client);
    }

    public async delete(request: Request, response: Response): Promise<void> {
        const { shop_id } = request.token;
        const { id } = request.params;

        const deleteClient = container.resolve(DeleteClientService);

        await deleteClient.execute({ id, shop_id });

        response.status(200).send();
    }

    public async restore(request: Request, response: Response): Promise<void> {
        const { shop_id } = request.token;
        const { id } = request.params;

        const restoreClient = container.resolve(RestoreClientService);

        await restoreClient.execute({ id, shop_id });

        response.status(200).send();
    }
}