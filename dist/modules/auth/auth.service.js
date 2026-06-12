import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../db/index.js';
import config from '../../config/index.js';
export const signupUser = async (data) => {
    const { name, email, password, role } = data;
    const validRole = role === 'maintainer' ? 'maintainer' : 'contributor';
    const hashedPassword = password ? await bcrypt.hash(password, 10) : '';
    const result = await pool.query(`INSERT INTO users (name, email, password, role) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, name, email, role, created_at, updated_at`, [name, email, hashedPassword, validRole]);
    return result.rows[0];
};
export const loginUser = async (data) => {
    const { email, password } = data;
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const isPasswordValid = password ? await bcrypt.compare(password, user.password) : false;
    if (!isPasswordValid) {
        return null;
    }
    const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, config.jwt_secret, { expiresIn: '1d' });
    const { password: _, ...userWithoutPassword } = user;
    return {
        token,
        user: userWithoutPassword,
    };
};
//# sourceMappingURL=auth.service.js.map