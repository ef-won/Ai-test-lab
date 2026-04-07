import { ApiError } from '../utils/apiError.js';

export const notFoundHandler = (_req, res) => {
  res.status(404).json({ message: 'Route not found' });
};

export const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
};
