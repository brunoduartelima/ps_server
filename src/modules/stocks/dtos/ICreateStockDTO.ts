export default interface ICreateStockDTO {
    value: number;
    type: string;
    supplier: string;
    description?: string;
    quantity: number;
    date: Date;
    company_id: string;
    product_id: string;
}