export default interface ICreateCustomerDTO {
    name: string;
    cpf: string;
    address: string;
    addressNumber: string;
    neighborhood: string;
    cep: string;
    sex: string;
    phone: string;
    dateBirth: Date;
    email?: string;
    idCompany: string;
}