import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindAllJobsFromCompanyService from '@modules/jobs/services/FindAllJobsFromCompanyService';

export default class FindAllJobsFromCompanyController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { page = 1 } = request.query;

        const findJobs = container.resolve(FindAllJobsFromCompanyService);

        const jobs = await findJobs.execute({ company_id, page: Number(page) });

        return response.json(jobs);
    }
}