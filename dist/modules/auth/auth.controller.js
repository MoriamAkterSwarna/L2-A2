import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse.js';
import { signupUser, loginUser } from './auth.service.js';
export const signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Name, email, and password are required',
            });
        }
        if (role && !['contributor', 'maintainer'].includes(role)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Role must be either contributor or maintainer',
            });
        }
        const newUser = await signupUser({ name, email, password, role });
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: 'User registered successfully',
            data: newUser,
        });
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Email and password are required',
            });
        }
        const loginResult = await loginUser({ email, password });
        if (!loginResult) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Login successful',
            data: loginResult,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map