 import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import UpdateCompanyService from '@modules/companies/services/UpdateCompanyService';
import ShowCompanyService from '@modules/companies/services/ShowCompanyService';

export default class CompaniesController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { idCompany } = request.token;

        const showCompany = container.resolve(ShowCompanyService);

        const company = await showCompany.execute({ idCompany });

        return response.json(company);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params;
        const { name, company_type, uf, city } = request.body;

        const createCompany = container.resolve(CreateCompanyService);
    
        const company = await createCompany.execute({
            name, 
            company_type, 
            uf, 
            city, 
            user_id
        });
    
        return response.json(company);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { idCompany } = request.token;
        const { name, company_type, uf, city } = request.body;

        const updateCompany = container.resolve(UpdateCompanyService);
    
        const company = await updateCompany.execute({
            name, 
            company_type,
            uf, 
            city, 
            idCompany
        });
    
        return response.json(company);
    }
}