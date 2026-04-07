# Node.js Auth API

A cleanly structured Node.js API built with Express and JWT-based authentication.

## Project structure

```
src/
  app.js
  server.js
  config/
    env.js
  controllers/
    authController.js
  middleware/
    authenticate.js
    errorHandler.js
    validateAuthBody.js
  routes/
    authRoutes.js
    index.js
  services/
    authService.js
    userService.js
  utils/
    apiError.js
    asyncHandler.js
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Run in development:
   ```bash
   npm run dev
   ```

## API endpoints

- `GET /api/health` - health check
- `POST /api/auth/register`
  - body: `{ "name": "John", "email": "john@example.com", "password": "password123" }`
- `POST /api/auth/login`
  - body: `{ "email": "john@example.com", "password": "password123" }`
- `GET /api/auth/me`
  - header: `Authorization: Bearer <token>`
