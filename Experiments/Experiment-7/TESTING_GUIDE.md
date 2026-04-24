# Experiment-7 RBAC Testing Guide

## Quick Testing Steps

### 1. Start the Application
```bash
mvn spring-boot:run
```
Wait until you see: `Started Experiment7Application`

### 2. Import Postman Collection
1. Open Postman
2. Click **Import** button
3. Select file: `Experiment-7-RBAC.postman_collection.json`
4. Click **Import**

### 3. Run Tests in Order

#### Test Group 1: Public Endpoints (No Auth)
- ✅ Execute: **Public - Hello**
  - Expected: HTTP 200 OK
  - Response: `{"message": "This is a public endpoint"}`

- ✅ Execute: **Public - Welcome**
  - Expected: HTTP 200 OK

---

#### Test Group 2: User Authentication & Authorization

##### Scenario A: Valid USER Login
- ✅ Execute: **User - Profile (USER Logged In)**
  - Auth: `user1` / `user123`
  - Expected: HTTP 200 OK
  - Response includes user details and roles

- ✅ Execute: **User - Dashboard (USER Logged In)**
  - Auth: `user1` / `user123`
  - Expected: HTTP 200 OK

- ✅ Execute: **User - Settings (USER Logged In)**
  - Auth: `user1` / `user123`
  - Expected: HTTP 200 OK

##### Scenario B: USER Unable to Access ADMIN Endpoint
- ✅ Execute: **USER Accessing Admin Endpoint (Should Fail - 403)**
  - Auth: `user1` / `user123`
  - **Expected: HTTP 403 Forbidden** ⚠️
  - This demonstrates authorization failure

---

#### Test Group 3: Admin Authentication & Authorization

##### Scenario A: Valid ADMIN Login
- ✅ Execute: **Admin - Dashboard (ADMIN Logged In)**
  - Auth: `admin1` / `admin123`
  - Expected: HTTP 200 OK
  - Response: Admin dashboard information

- ✅ Execute: **Admin - Users List (ADMIN Logged In)**
  - Auth: `admin1` / `admin123`
  - Expected: HTTP 200 OK

- ✅ Execute: **Admin - Settings (ADMIN Logged In)**
  - Auth: `admin1` / `admin123`
  - Expected: HTTP 200 OK

- ✅ Execute: **Admin - Reports (ADMIN Logged In)**
  - Auth: `admin1` / `admin123`
  - Expected: HTTP 200 OK

##### Scenario B: ADMIN Can Access USER Endpoints
- ✅ Execute: **ADMIN Accessing User Endpoint (Should Succeed - 200)**
  - Auth: `admin1` / `admin123`
  - **Expected: HTTP 200 OK** ✅
  - This demonstrates admin has elevated privileges

---

#### Test Group 4: Failed Authentication Tests

##### Scenario A: No Authentication
- ✅ Execute: **User - Profile (NO AUTH - Should Fail)**
  - No authentication headers
  - **Expected: HTTP 401 Unauthorized** ⚠️

##### Scenario B: Invalid Credentials
- ✅ Execute: **Invalid Credentials (Wrong Password)**
  - Auth: `user1` / `wrongpassword`
  - **Expected: HTTP 401 Unauthorized** ⚠️

##### Scenario C: Non-existent User
- ✅ Execute: **Non-existent User**
  - Auth: `nonexistent` / `anypassword`
  - **Expected: HTTP 401 Unauthorized** ⚠️

---

## Key Test Scenarios for Screenshots

### Required Screenshots (Minimum 4):

1. **Login Request with Valid Credentials**
   - Run: **User - Profile (USER Logged In)**
   - Capture: Request with Basic Auth headers visible
   - File: `01-login-success.png`

2. **Successful Response After Login**
   - Run: **User - Profile (USER Logged In)**
   - Capture: Response body showing user details
   - File: `02-user-authenticated-success.png`

3. **USER Role Accessing User Endpoint Successfully**
   - Run: **User - Dashboard (USER Logged In)**
   - Capture: 200 OK response
   - File: `03-user-endpoint-success.png`

4. **USER Role Denied Access to ADMIN Endpoint**
   - Run: **USER Accessing Admin Endpoint (Should Fail - 403)**
   - Capture: 403 Forbidden response
   - File: `04-access-denied-403.png`

### Recommended Additional Screenshots:

5. **Invalid Login Attempt**
   - Run: **Invalid Credentials (Wrong Password)**
   - Capture: 401 Unauthorized response
   - File: `05-invalid-credentials-401.png`

6. **Request Without Token (401 Unauthorized)**
   - Run: **User - Profile (NO AUTH - Should Fail)**
   - Capture: 401 Unauthorized response
   - File: `06-no-auth-401.png`

7. **ADMIN Accessing ADMIN Endpoint**
   - Run: **Admin - Dashboard (ADMIN Logged In)**
   - Capture: 200 OK with admin response
   - File: `07-admin-success-200.png`

8. **ADMIN Accessing USER Endpoint**
   - Run: **ADMIN Accessing User Endpoint (Should Succeed - 200)**
   - Capture: 200 OK response
   - File: `08-admin-user-endpoint-success.png`

9. **H2 Database Console**
   - Open: http://localhost:8080/h2-console
   - Capture: Users and Roles table structure
   - File: `09-database-structure.png`

10. **Project Folder Structure**
    - Capture: Maven project structure in IDE
    - File: `10-project-structure.png`

---

## Testing Response Codes

| Endpoint | User | Expected | Meaning |
|----------|------|----------|---------|
| /api/public/* | None | 200 | Public access |
| /api/user/* | None | 401 | Unauthorized |
| /api/user/* | user1 | 200 | Authorized |
| /api/user/* | admin1 | 200 | Authorized (elevated) |
| /api/admin/* | None | 401 | Unauthorized |
| /api/admin/* | user1 | 403 | Forbidden (insufficient role) |
| /api/admin/* | admin1 | 200 | Authorized |

---

## How to Take Screenshots in Postman

### For Request:
1. Click the request
2. Setup Auth (if needed)
3. Click **Send**
4. In the request tab, select **Headers** tab
5. Use Print Screen or Snipping Tool
6. Capture showing:
   - Request URL
   - HTTP Method
   - Authorization details
   - Status code

### For Response:
1. After clicking **Send**
2. View the response in the lower panel
3. Click **Body** tab
4. Use Print Screen or Snipping Tool
5. Capture showing:
   - HTTP Status Code
   - Response JSON
   - Response time

### Using Snipping Tool (Windows):
1. Press `Win + Shift + S`
2. Select rectangular area
3. Save as PNG in `screenshots/` folder

---

## Database Inspection

### Via H2 Console:
1. Open: `http://localhost:8080/h2-console`
2. Use default connection:
   - **JDBC URL**: `jdbc:h2:mem:testdb`
   - **Username**: `sa`
   - **Password**: (leave empty)
3. Click **Connect**
4. Run SQL query: `SELECT * FROM USERS;`
5. Take screenshot showing users and roles

### Via Spring Boot Logs:
Check console output for SQL debug logs:
```
DEBUG org.hibernate.SQL : SELECT ... FROM USERS
DEBUG org.hibernate.type.descriptor.sql.BasicBinder : binding parameter [1] as [VARCHAR] - [user1]
```

---

## Test Coverage Checklist

- [ ] Public endpoint accessible without auth
- [ ] User login succeeds with valid credentials
- [ ] User can access user endpoints
- [ ] User cannot access admin endpoints (403)
- [ ] Unauthenticated access denied (401)
- [ ] Invalid credentials denied (401)
- [ ] Admin can access all endpoints
- [ ] Admin can access user endpoints
- [ ] Admin can access admin endpoints
- [ ] Database contains correct users and roles
- [ ] Password encoding is verified
- [ ] HTTP status codes are correct

---

## Common Issues & Troubleshooting

### Issue: 401 Unauthorized for valid credentials
**Solution**: Ensure passwords are correct and match data.sql
- user1: `user123`
- admin1: `admin123`

### Issue: 403 Forbidden appears instead of 401
**Solution**: Check if user is authenticated but lacks role

### Issue: Port 8080 already in use
**Solution**: 
```bash
# Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Issue: H2 console not loading
**Solution**: Check application.properties:
```properties
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

### Issue: Data.sql not loading
**Solution**: Ensure it's in `src/main/resources/` folder

---

## Test Results Summary

After running all tests, you should have:
- ✅ 8 successful (200 OK) responses
- ✅ 4 forbidden (403) responses
- ✅ 4 unauthorized (401) responses
- ✅ All endpoints working as designed
- ✅ Proper role-based access control
- ✅ Screenshots for submission

---

## Save Test Results

1. Create folder: `screenshots/`
2. Save all Postman response screenshots
3. Save database structure screenshot
4. Save project structure screenshot
5. Include HTTP status codes in each screenshot

**Total required: Minimum 4, Recommended: 8+**

---

## Next Steps After Testing

1. ✅ Verify all scenarios pass
2. ✅ Save screenshots in `screenshots/` folder
3. ✅ Update README.md with test results
4. ✅ Commit to Git
5. ✅ Submit Google Form with project details

---

**Experiment-7 Deadline: 07 April 2026, Evening**
