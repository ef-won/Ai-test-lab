import { authService } from '../services/authService.js';
import { userService } from '../services/userService.js';
import { ApiError } from '../utils/apiError.js';

export const authenticate = (req, _res, next) => {
  const header = req.headers.authorization ?? '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new ApiError(401, 'Missing or invalid authorization header');
  }

  try {
    const payload = authService.verifyToken(token);
    const user = userService.findById(payload.sub);

    if (!user) {
      throw new ApiError(401, 'User no longer exists');
    }

    req.user = user;
    next();
  } catch (_error) {
    throw new ApiError(401, 'Invalid or expired token');
  }
};
