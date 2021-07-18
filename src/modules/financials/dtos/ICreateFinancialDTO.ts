export default interface ICreateProductDTO {
    title: string;
    description?: string;
    value: number;
    type: string;
    parcel_mount: number;
    due_date: Date;
    active: boolean;
    company_id: string;
}