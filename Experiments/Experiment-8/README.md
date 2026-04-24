# Experiment-8: Frontend Integration with JWT APIs

## Overview
This is a React frontend application that integrates with JWT authentication APIs from Experiment-6. It implements session-based authentication where JWT tokens are stored in `sessionStorage` and used to access protected endpoints.

## 🎯 Objectives
- ✅ Build a frontend UI that consumes JWT APIs
- ✅ Implement session-based authentication (token stored per session)
- ✅ Restrict access to pages based on login state
- ✅ Demonstrate tested endpoints from frontend

## 🧩 Features Implemented

### 1. **Login Page**
- User authentication with username and password
- API Call: `POST /login`
- On successful login:
  - JWT token stored in `sessionStorage`
  - User redirected to dashboard
  - Username also stored for display
- Error handling with user-friendly messages
- Demo credentials hint for testing

### 2. **Protected Dashboard Page**
- Only accessible if JWT exists in session
- API Call: `GET /protected` with Bearer token
- Features:
  - Fetch data from protected endpoint
  - Display response from server
  - View session information
  - Token visible in truncated form
  - Instruction to view token in DevTools

### 3. **Logout Functionality**
- Clears `sessionStorage` (token and username)
- Redirects user back to login page
- Accessible from navbar

## 💻 Tech Stack
- **React 18** - Frontend framework
- **Vite** - Build tool
- **Axios** - HTTP client for API calls
- **Bootstrap 5** - CSS framework for styling
- **JavaScript ES6+** - Modern JavaScript

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Experiment-6 backend running on `http://localhost:5000`

### Installation Steps

```bash
# Navigate to Experiment-8
cd Experiment-8

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
Experiment-8/
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Login component
│   │   ├── Login.css           # Login styling
│   │   ├── Dashboard.jsx       # Protected dashboard component
│   │   └── Dashboard.css       # Dashboard styling
│   ├── App.jsx                 # Main app with routing logic
│   ├── App.css                 # App styling
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
└── README.md                   # This file
```

## 🔐 Session-Based Restriction Logic

### Authentication Flow
1. User enters credentials on Login page
2. Frontend sends `POST /login` request to backend
3. Backend returns JWT token
4. Token stored in `sessionStorage`
5. App redirects to Dashboard
6. Dashboard checks for token before rendering
7. If no token → redirect to Login
8. Token sent in headers for protected requests: `Authorization: Bearer <token>`
9. Logout clears session and returns to Login

### Protected Routes
- **Dashboard** - Accessible only if `sessionStorage.token` exists
- **Login** - Accessible when not authenticated
- Automatic redirect based on authentication state

## 🧪 Testing

### Demo Credentials
```
Username: user
Password: pass123
```

### Test Cases

#### 1. **Login Test**
- [ ] Open application
- [ ] Enter demo credentials (user / pass123)
- [ ] Click "Login" button
- [ ] Verify redirect to Dashboard
- [ ] Token should appear in sessionStorage

#### 2. **Token Storage Test**
- [ ] After login, open DevTools (F12)
- [ ] Go to Application → Session Storage
- [ ] Verify `token` and `user` keys are present
- [ ] Token should be JWT format (xxx.yyy.zzz)

#### 3. **Protected Data Access**
- [ ] On Dashboard, click "Fetch Protected Data"
- [ ] Verify data appears from protected endpoint
- [ ] Check Network tab to see `Authorization` header

#### 4. **Session Persistence**
- [ ] After login, refresh the page
- [ ] Dashboard should still be accessible
- [ ] Token should still exist in sessionStorage

#### 5. **Logout Test**
- [ ] Click "Logout" button
- [ ] Verify redirect to Login page
- [ ] Verify sessionStorage is cleared (DevTools → Session Storage)

#### 6. **Unauthorized Access**
- [ ] Manually clear sessionStorage: `sessionStorage.clear()`
- [ ] Refresh page
- [ ] Should be redirected to Login page
- [ ] Dashboard should NOT be accessible

## 📡 API Endpoints Used

### Login Endpoint
```
POST /login
Content-Type: application/json

{
  "username": "user",
  "password": "pass123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Protected Endpoint
```
GET /protected
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "message": "This is protected data"
}
```

## 🎨 UI Components

### Login Component
- Responsive login form
- Username and password inputs
- Error message display
- Loading state during login
- Demo credentials section
- Beautiful gradient background

### Dashboard Component
- Navigation bar with welcome message
- Protected data fetch section
- Session information card
- Token display (truncated for security)
- Response display area
- DevTools instruction for viewing token

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Build Locally
```bash
npm run preview
```

## 🔍 Key Features

✨ **Session-Based Authentication**
- Tokens stored in sessionStorage (not localStorage)
- Session expires when browser window closes
- More secure for sensitive operations

🛡️ **Security**
- JWT tokens sent in Authorization headers
- Token truncated in UI display
- Proper error handling
- Input validation

🎯 **User Experience**
- Loading states during API calls
- Error messages for failed requests
- Responsive design (mobile-friendly)
- Clean, modern UI with Bootstrap

## 📝 Notes

- The backend (Experiment-6) must be running on `http://localhost:5000`
- CORS must be enabled on the backend for requests from `http://localhost:3000`
- Tokens are stored in `sessionStorage` (not `localStorage`) per requirements
- The app automatically checks for token on load and maintains auth state

## 🐛 Troubleshooting

### API Connection Issues
- Verify Experiment-6 backend is running on port 5000
- Check browser console for CORS errors
- Ensure backend has CORS enabled for `localhost:3000`

### Token Not Storing
- Check if sessionStorage is enabled in browser
- Verify API response contains `token` field
- Check browser DevTools → Application → Session Storage

### Logout Not Working
- Ensure browser allows sessionStorage clearing
- Check that logout button click triggers the handler

## 📚 References

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)
- [Bootstrap 5](https://getbootstrap.com)
- [JWT.io](https://jwt.io)

---

**Created:** April 17, 2026  
**Status:** Complete ✅
