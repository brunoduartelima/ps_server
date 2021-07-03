import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindJobByNameService from '@modules/jobs/services/FindJobByNameService';

export default class FindJobByNameController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { name } = request.query;

        const findJobs = container.resolve(FindJobByNameService);

        const jobs = await findJobs.execute({ company_id, name: String(name) });

        return response.json(jobs);
    }
}