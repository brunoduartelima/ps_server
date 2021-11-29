import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindJobDetailsService from '@modules/jobs/services/FindJobDetailsService';

export default class FindJobDetailsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { id } = request.params;

        const findJob = container.resolve(FindJobDetailsService);

        const job = await findJob.execute({ company_id, id });

        return response.json(job);
    }
}