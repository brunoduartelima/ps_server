declare namespace Express {
    export interface Request {
        token: {
            user_id: string;
            company_id: string;
        };
    }
}