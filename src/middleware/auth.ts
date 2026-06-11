import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import pool from "../db/index.js";
import type { ROLES } from "../types/AuthRequest.js";

const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        res.status(401).json({
          success: false,
          message: "Unauthorized access!!",
        });
        return;
      }

      let token = authHeader;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1] as string;
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;

      const userData = await pool.query(
        `SELECT * FROM users WHERE id=$1`,
        [decoded.id],
      );

      const user = userData.rows[0];

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found!",
        });
        return;
      }

      if (roles.length && !roles.includes(user.role as ROLES)) {
        res.status(403).json({
          success: false,
          message: "Forbidden!! This role has no access!",
        });
        return;
      }

      req.user = {
        id: user.id,
        name: user.name,
        role: user.role,
      };

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};

export default auth;