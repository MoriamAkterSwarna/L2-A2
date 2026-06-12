import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../db/index.js';
import config from '../../config/index.js';

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

export const signupUser = async (data: SignupPayload) => {
  const { name, email, password, role } = data;
  const validRole = role === 'maintainer' ? 'maintainer' : 'contributor';
  const hashedPassword = password ? await bcrypt.hash(password, 10) : '';

  const result = await pool.query(
    `INSERT INTO users (name, email, password, role) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, hashedPassword, validRole]
  );

  return result.rows[0];
};
