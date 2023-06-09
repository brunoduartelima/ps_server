declare namespace Express {
    export interface Request {
        token: {
            idUser: string;
            idCompany: string;
            accessLevel: string;
        };
    }
}