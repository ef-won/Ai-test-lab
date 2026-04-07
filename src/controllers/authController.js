import { userService } from '../services/userService.js';
import { authService } from '../services/authService.js';

export const authController = {
  async register(req, res) {
    const user = await userService.createUser(req.body);
    const token = authService.signToken({ sub: user.id, email: user.email });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });
  },

  async login(req, res) {
    const user = await userService.verifyCredentials(req.body);
    const token = authService.signToken({ sub: user.id, email: user.email });

    res.status(200).json({
      message: 'Login successful',
      token,
      user
    });
  },

  profile(req, res) {
    res.status(200).json({ user: req.user });
  }
};
