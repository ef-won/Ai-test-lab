import bcrypt from 'bcryptjs';
import { ApiError } from '../utils/apiError.js';

const users = [];
let nextUserId = 1;

const sanitize = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  createdAt: user.createdAt
});

export const userService = {
  async createUser({ name, email, password }) {
    const existing = users.find((user) => user.email === email.toLowerCase());
    if (existing) {
      throw new ApiError(409, 'Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: nextUserId++,
      name,
      email: email.toLowerCase(),
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    return sanitize(user);
  },

  async verifyCredentials({ email, password }) {
    const user = users.find((entry) => entry.email === email.toLowerCase());
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    return sanitize(user);
  },

  findById(id) {
    const user = users.find((entry) => entry.id === Number(id));
    return user ? sanitize(user) : null;
  }
};
