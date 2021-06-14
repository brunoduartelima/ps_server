export default interface ICreateProductDTO {
    name: string;
    code?: string;
    description?: string;
    price: number;
    quantity: number;
    average_cost: number;
    shop_id: string;
}