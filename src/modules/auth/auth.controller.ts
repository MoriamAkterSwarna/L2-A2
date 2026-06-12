import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse.js';
import { signupUser, loginUser } from './auth.service.js';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error) {
    next(error);
  }
};
