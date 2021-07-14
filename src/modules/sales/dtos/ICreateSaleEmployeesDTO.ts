interface IEmployee {
    sale_id: string;
    employee_id: string;
    commission?: number;
}

export default interface ICreateSaleEmployeesDTO {
    employees: IEmployee[];
}