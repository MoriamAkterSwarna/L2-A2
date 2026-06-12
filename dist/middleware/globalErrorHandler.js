import { StatusCodes } from 'http-status-codes';
const globalErrorHandler = (err, _req, res, _next) => {
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Something went wrong';
    let errors = err.errors || err.message;
    if (err.code === '23505') {
        statusCode = StatusCodes.BAD_REQUEST;
        message = 'Duplicate field value entered';
    }
    res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map