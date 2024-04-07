interface User {
    id: string;
    name: string;
    emailId: string;
    password: string;
    refreshToken: string;
}

type MiddlewareUser = Omit<User,"password" | "refreshToken">