# Experiment-9: Frontend Integration with RBAC (React + Session-Based UI)

## Overview
This experiment builds a React frontend to consume the RBAC backend from Experiment-7. It demonstrates role-based UI controls, session-based authentication, and restricted access for USER and ADMIN roles.

## Features
- Login page with username and password
- Session-based authentication using `sessionStorage`
- Redirects based on role:
  - `USER` → `/user`
  - `ADMIN` → `/admin`
- User and Admin dashboards with role-dependent UI
- Role-based access control for API calls
- Logout clears session storage and returns to login

## Tech Stack
- React
- Vite
- Axios
- Bootstrap
- Material UI
- React Router

## Project Structure
```
Experiment-9/
├── src/
│   ├── components/
│   │   ├── AdminDashboard.jsx
│   │   ├── Login.jsx
│   │   └── UserDashboard.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Installation
```bash
cd Experiment-9
npm install
npm run dev
```

## Usage
1. Open the application at the Vite dev server URL.
2. Login with credentials.
3. If the username contains `admin`, user is routed to the admin dashboard.
4. Regular usernames are routed to the user dashboard.

## API Endpoints Used
- `GET http://localhost:8080/api/user/profile`
- `GET http://localhost:8080/api/admin/dashboard`

> Note: The frontend assumes the Experiment-7 backend is running at `http://localhost:8080`.

## Role-Based Behavior
- `USER` can only access user endpoints.
- `ADMIN` can access all endpoints and sees extra controls.
- Unauthorized access redirects to the login page.

## Required Screenshots
- Login UI
- USER accessing user endpoint
- USER denied admin endpoint
- ADMIN accessing admin endpoint
- Session storage showing role
- Unauthorized access handling

## Notes
`sessionStorage` stores the current username, password, and role for the session. This keeps the UI state while the browser tab remains open.
