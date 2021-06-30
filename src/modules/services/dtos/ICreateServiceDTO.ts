export default interface ICreateServiceDTO {
    name: string;
    description?: string;
    price: number;
    average_time: Date;
    shop_id: string;
}