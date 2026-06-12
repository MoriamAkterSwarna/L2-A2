export interface SignupPayload {
    name: string;
    email: string;
    password?: string;
    role?: string;
}
export interface LoginPayload {
    email: string;
    password?: string;
}
export declare const signupUser: (data: SignupPayload) => Promise<any>;
export declare const loginUser: (data: LoginPayload) => Promise<{
    token: string;
    user: any;
} | null>;
//# sourceMappingURL=auth.service.d.ts.map