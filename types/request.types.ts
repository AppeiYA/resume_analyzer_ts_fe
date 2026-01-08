export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserRegisterRequest {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}