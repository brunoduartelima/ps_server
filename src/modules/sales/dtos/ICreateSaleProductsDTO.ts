interface IProduct {
    sale_id: string;
    product_id: string;
    price: number;
    descont?: number;
    quantity: number;
}

export default interface ICreateSaleProductsDTO {
    products: IProduct[];
}