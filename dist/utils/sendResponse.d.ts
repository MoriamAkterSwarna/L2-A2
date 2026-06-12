import type { Response } from 'express';
type ApiResponse<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: T;
};
declare const sendResponse: <T>(res: Response, data: ApiResponse<T>) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map