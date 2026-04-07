import { ApiError } from '../utils/apiError.js';

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const validateRegisterBody = (req, _res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string') {
    throw new ApiError(400, 'Name is required');
  }

  if (!email || !isEmail(email)) {
    throw new ApiError(400, 'A valid email is required');
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    throw new ApiError(400, 'Password must be at least 8 characters long');
  }

  next();
};

export const validateLoginBody = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !isEmail(email)) {
    throw new ApiError(400, 'A valid email is required');
  }

  if (!password || typeof password !== 'string') {
    throw new ApiError(400, 'Password is required');
  }

  next();
};
