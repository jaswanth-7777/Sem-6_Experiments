# Experiment-10: CRUD Operations on Database using Node.js + Express.js Backend

## Overview
This experiment demonstrates how to perform **CRUD Operations** (Create, Read, Update, Delete) on a database using **Node.js** and **Express.js** as the backend, with **MongoDB** as the database.

## 🎯 Objectives
- Build REST APIs using Node.js and Express.js
- Connect backend with MongoDB database
- Perform Create, Read, Update, Delete operations
- Test APIs using Postman / Browser
- Understand backend routing and controllers

## 🧩 Features Implemented

### 1. Create Record
- Add new student data into database
- Fields: name, email, course

### 2. Read Records
- Fetch all records
- Fetch single record using ID

### 3. Update Record
- Modify existing data using ID

### 4. Delete Record
- Remove record using ID

## 💻 Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **Postman** - API testing

## ⚙️ Installation

```bash
cd Experiment-10
npm install
npm run dev
```

## 📁 Project Structure

```
Experiment-10/
├── server.js              # Main Express server
├── package.json            # Dependencies
├── models/
│   └── Student.js         # Mongoose model
└── routes/
    └── studentRoutes.js   # API routes
```

## 🧱 Backend Implementation

### server.js
- Express server setup
- MongoDB connection using Mongoose
- CORS middleware
- JSON parsing
- Routes mounting

### models/Student.js
- Mongoose schema for Student
- Fields: name, email, course

### routes/studentRoutes.js
- POST `/api/students` - Create new student
- GET `/api/students` - Get all students
- GET `/api/students/:id` - Get single student
- PUT `/api/students/:id` - Update student
- DELETE `/api/students/:id` - Delete student

## ▶️ Run Project

```bash
npm run dev
```

Server runs on: **http://localhost:5000**

## 🧪 API Testing (Postman)

### Create Record
- **Method:** POST
- **URL:** `http://localhost:5000/api/students`
- **Body:**
```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "course": "BCA"
}
```

### Get All Records
- **Method:** GET
- **URL:** `http://localhost:5000/api/students`

### Get Single Record
- **Method:** GET
- **URL:** `http://localhost:5000/api/students/:id`

### Update Record
- **Method:** PUT
- **URL:** `http://localhost:5000/api/students/:id`
- **Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@gmail.com",
  "course": "MCA"
}
```

### Delete Record
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/students/:id`

## 📸 Required Screenshots
- [ ] MongoDB Connected Message
- [ ] Create Record API Success
- [ ] Read All Records Output
- [ ] Update Record Success
- [ ] Delete Record Success
- [ ] Database Collection View

## 📘 Summary
- Node.js and Express.js used as backend
- MongoDB stores records
- CRUD operations implemented with REST APIs
- Tested using Postman