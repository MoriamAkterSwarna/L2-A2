import type { Request } from 'express';
export interface AuthRequest extends Request {
    user?: {
        id: number;
        name: string;
        role: string;
    };
}
export declare const USER_ROLE: {
    readonly contributor: "contributor";
    readonly maintainer: "maintainer";
};
export type ROLES = keyof typeof USER_ROLE;
export type RoleValue = typeof USER_ROLE[keyof typeof USER_ROLE];
export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: RoleValue;
    created_at: string;
    updated_at: string;
}
export interface IUserResponse {
    id: number;
    name: string;
    email: string;
    role: RoleValue;
    created_at: string;
    updated_at: string;
}
export interface IssueData {
    id: number;
    title: string;
    description: string;
    type: 'bug' | 'feature_request';
    status: 'open' | 'in_progress' | 'resolved';
    reporter_id: number | null;
    created_at: string;
    updated_at: string;
}
//# sourceMappingURL=AuthRequest.d.ts.map