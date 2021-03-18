import { v4 as uuid } from 'uuid';

class User {
    id: string;
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.id = uuid();
        this.email = email;
        this.password = password;
    }
}

export default User;