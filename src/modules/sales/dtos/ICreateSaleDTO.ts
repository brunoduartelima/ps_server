interface IProduct {
    product_id: string;
    price: number;
    descont?: number;
    quantity: number;
}

interface IJob {
    job_id: string;
    price: number;
    descont?: number;
    quantity: number;
}

interface IEmployee {
    employee_id: string;
    commission?: number;
}

export default interface ICreateSaleDTO {
    type: string;
    description?: string;
    date: Date;
    company_id: string;
    employees: IEmployee[];
    customer_id?: string;
    products?: IProduct[];
    jobs?: IJob[];
}