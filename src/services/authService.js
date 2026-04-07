import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const authService = {
  signToken(payload) {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
  },

  verifyToken(token) {
    return jwt.verify(token, env.jwtSecret);
  }
};
