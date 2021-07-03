export default interface ICreateProductDTO {
    name: string;
    code?: string;
    description?: string;
    price: number;
    quantity: number;
    average_cost: number;
    company_id: string;
}