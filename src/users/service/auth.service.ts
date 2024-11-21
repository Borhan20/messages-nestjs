
export interface AuthService {

    signup(email:string, password: string);
    signin(email: string, password: string);
}