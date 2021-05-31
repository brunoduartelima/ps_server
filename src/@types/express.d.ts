declare namespace Express {
    export interface Request {
        token: {
            user_id: string;
            shop_id: string;
        };
    }
}