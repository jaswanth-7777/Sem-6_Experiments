# Experiment 6 - JWT Authentication Backend

This project demonstrates JWT authentication with login, protected route, and logout token invalidation.

## Setup
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set your values.
3. Start server: `npm run dev` or `npm start`

## API
- POST `/api/auth/login` - login with email+password, returns token
- GET `/api/auth/protected` - protected route requires Bearer token
- POST `/api/auth/logout` - invalidates current token (in-memory blacklist)

## Testing (Postman)
1. POST login to get token.
2. Use `Authorization: Bearer <token>` to call protected route.
3. POST logout and verify token no longer works.
