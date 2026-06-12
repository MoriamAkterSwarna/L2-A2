import type { Request, Response, NextFunction } from 'express';
interface AppError extends Error {
    statusCode?: number;
    errors?: string;
    code?: string;
}
declare const globalErrorHandler: (err: AppError, _req: Request, res: Response, _next: NextFunction) => void;
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.d.ts.map