export default interface ICreateFinancialDTO {
    title: string;
    description?: string;
    value: number;
    type: string;
    parcel_mount: number;
    due_date: Date;
    active: boolean;
    company_id: string;
}