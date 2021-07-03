import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindNewlyAddJobsService from '@modules/jobs/services/FindNewlyAddJobsService';
import CreateJobService from '@modules/jobs/services/CreateJobService';
import UpdateJobService from '@modules/jobs/services/UpdateJobService';
import DeleteJobService from '@modules/jobs/services/DeleteJobService';
import RestoreJobService from '@modules/jobs/services/RestoreJobService';

export default class JobsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;

        const findJobs = container.resolve(FindNewlyAddJobsService);

        const jobs = await findJobs.execute({ company_id });

        return response.json(jobs);

    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { name, description, price, average_time } = request.body;

        const createJob = container.resolve(CreateJobService);

        const job = await createJob.execute({
            name,
            description, 
            price,
            average_time, 
            company_id
        });

        return response.json(job);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { company_id } = request.token;
        const { id } = request.params;
        const { name, description, price, average_time } = request.body;

        const updateJob = container.resolve(UpdateJobService);

        const job = await updateJob.execute({
            id,
            name,
            description, 
            price,
            average_time, 
            company_id
        });

        return response.json(job);
    }

    public async delete(request: Request, response: Response): Promise<void> {
        const { company_id } = request.token;
        const { id } = request.params;

        const deleteJob = container.resolve(DeleteJobService);

        await deleteJob.execute({ id, company_id });

        response.status(200).send();
    }

    public async restore(request: Request, response: Response): Promise<void> {
        const { company_id } = request.token;
        const { id } = request.params;

        const restoreJob = container.resolve(RestoreJobService);

        await restoreJob.execute({ id, company_id });

        response.status(200).send();
    }
}