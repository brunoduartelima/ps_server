export default interface ICreateJobDTO {
    name: string;
    description?: string;
    price: number;
    average_time: Date;
    company_id: string;
}