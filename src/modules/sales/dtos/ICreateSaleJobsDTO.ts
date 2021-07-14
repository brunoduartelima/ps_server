interface IJob {
    sale_id: string;
    job_id: string;
    price: number;
    descont?: number;
    quantity: number;
}

export default interface ICreateSaleJobsDTO {
    jobs: IJob[];
}