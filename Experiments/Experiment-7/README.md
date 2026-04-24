# Experiment-7: Role-Based Authorization (RBAC) in Spring Boot

## Overview
This project implements **Role-Based Access Control (RBAC)** in a Spring Boot application using Spring Security. The application demonstrates authentication and authorization with different user roles (USER and ADMIN) and protected endpoints based on those roles.

## Objectives
- Implement authentication using Spring Security
- Implement role-based authorization for API endpoints
- Demonstrate access control with different user roles
- Test authorization using Postman
- Understand HTTP status codes: 401 Unauthorized and 403 Forbidden

## Project Structure
```
src/
├── main/
│   ├── java/com/example/experiment7/
│   │   ├── config/
│   │   │   └── SecurityConfig.java          # Spring Security configuration
│   │   ├── controller/
│   │   │   ├── PublicController.java        # Public endpoints
│   │   │   ├── UserController.java          # User-only endpoints
│   │   │   └── AdminController.java         # Admin-only endpoints
│   │   ├── dto/
│   │   │   ├── LoginRequest.java            # Login request DTO
│   │   │   └── LoginResponse.java           # Login response DTO
│   │   ├── entity/
│   │   │   ├── User.java                    # User entity
│   │   │   └── Role.java                    # Role entity
│   │   ├── repository/
│   │   │   ├── UserRepository.java          # User JPA repository
│   │   │   └── RoleRepository.java          # Role JPA repository
│   │   ├── service/
│   │   │   └── CustomUserDetailsService.java # Custom user details service
│   │   └── Experiment7Application.java      # Main Spring Boot application
│   └── resources/
│       ├── application.properties           # Application configuration
│       └── data.sql                         # Initial database data
└── test/
└── pom.xml                                  # Maven dependencies

screenshots/                                 # Test screenshots folder
└── (Test screenshots will be added here)
```

## Technologies Used
- **Spring Boot 3.1.4**
- **Spring Security** - Authentication and Authorization
- **Spring Data JPA** - Database operations
- **H2 Database** - In-memory database for testing
- **BCrypt** - Password encoding
- **Lombok** - Reduce boilerplate code
- **Maven** - Build tool

## Dependencies (pom.xml)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

## User Roles
The application supports two roles:

### 1. USER Role (ROLE_USER)
- Can access user endpoints
- Can access public endpoints
- Cannot access admin endpoints

### 2. ADMIN Role (ROLE_ADMIN)
- Can access all endpoints (public, user, and admin)
- Full system access

## API Endpoints

### Public Endpoints (No Authentication Required)
```
GET /api/public/hello
- Response: JSON message
- Status: 200 OK

GET /api/public/welcome
- Response: Welcome message with description
- Status: 200 OK
```

### User Endpoints (Requires USER or ADMIN role)
```
GET /api/user/profile
- Description: Get user profile information
- Auth: Required (USER, ADMIN)
- Response: User details and roles
- Status: 200 OK for authorized, 403 Forbidden for unauthorized

GET /api/user/dashboard
- Description: User dashboard access
- Auth: Required (USER, ADMIN)
- Response: Dashboard information
- Status: 200 OK

GET /api/user/settings
- Description: User settings management
- Auth: Required (USER, ADMIN)
- Response: User settings
- Status: 200 OK
```

### Admin Endpoints (Requires ADMIN role only)
```
GET /api/admin/dashboard
- Description: Admin dashboard with system overview
- Auth: Required (ADMIN only)
- Response: Admin dashboard information
- Status: 200 OK for admin, 403 Forbidden for users

GET /api/admin/users
- Description: List all users (admin privilege)
- Auth: Required (ADMIN only)
- Response: User management information
- Status: 200 OK

GET /api/admin/settings
- Description: Manage system-wide settings
- Auth: Required (ADMIN only)
- Response: Settings information
- Status: 200 OK

GET /api/admin/reports
- Description: View system reports and analytics
- Auth: Required (ADMIN only)
- Response: Reports data
- Status: 200 OK
```

## Test Users (Default)

| Username | Password | Role      | Access Level |
|----------|----------|-----------|--------------|
| user1    | user123  | USER      | User level   |
| user2    | user123  | USER      | User level   |
| admin1   | admin123 | ADMIN     | Full access  |
| admin2   | admin123 | ADMIN     | Full access  |

**Note:** Passwords are encrypted using BCrypt algorithm.

## Setup and Installation

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Postman (for API testing)

### Steps to Run

1. **Clone/Extract the project:**
   ```bash
   cd Experiment-7
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application:**
   - Application URL: `http://localhost:8080`
   - H2 Console: `http://localhost:8080/h2-console`

## HTTP Status Codes

| Status Code | Meaning | When Used |
|-------------|---------|-----------|
| 200 OK | Success | Endpoint accessed successfully with valid authentication and authorization |
| 401 Unauthorized | Authentication Missing/Failed | No credentials provided or invalid credentials |
| 403 Forbidden | Authorization Failed | Valid authentication but insufficient permissions/role |
| 404 Not Found | Resource Not Found | Endpoint or resource not found |

## Testing with Postman

### Step 1: Access Public Endpoint
- **Method:** GET
- **URL:** `http://localhost:8080/api/public/hello`
- **Auth:** None
- **Expected:** 200 OK

### Step 2: Login as Normal User
- **Method:** GET
- **URL:** `http://localhost:8080/api/user/profile`
- **Auth Type:** Basic Auth
  - Username: `user1`
  - Password: `user123`
- **Expected:** 200 OK with user profile

### Step 3: User Accessing Admin Endpoint
- **Method:** GET
- **URL:** `http://localhost:8080/api/admin/dashboard`
- **Auth Type:** Basic Auth
  - Username: `user1`
  - Password: `user123`
- **Expected:** 403 Forbidden

### Step 4: No Authentication
- **Method:** GET
- **URL:** `http://localhost:8080/api/user/profile`
- **Auth:** None
- **Expected:** 401 Unauthorized

### Step 5: Admin Accessing Admin Endpoint
- **Method:** GET
- **URL:** `http://localhost:8080/api/admin/dashboard`
- **Auth Type:** Basic Auth
  - Username: `admin1`
  - Password: `admin123`
- **Expected:** 200 OK with admin dashboard

### Step 6: Admin Accessing User Endpoint
- **Method:** GET
- **URL:** `http://localhost:8080/api/user/profile`
- **Auth Type:** Basic Auth
  - Username: `admin1`
  - Password: `admin123`
- **Expected:** 200 OK (Admin has access to all endpoints)

## Security Configuration Details

### Password Encoding
- Uses BCrypt password encoder
- All passwords are hashed before storage
- Plaintext passwords are never stored in the database

### Security Filter Chain
```java
.csrf(csrf -> csrf.disable())
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/public/**").permitAll()
    .requestMatchers("/api/auth/**").permitAll()
    .requestMatchers("/h2-console/**").permitAll()
    .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .anyRequest().authenticated()
)
.httpBasic(Customizer.withDefaults());
```

## Key Features

1. **Role-Based Access Control**
   - Different endpoints protected based on user roles
   - Flexible role assignment

2. **Secure Password Storage**
   - BCrypt password encoding
   - No plaintext passwords in database

3. **HTTP Basic Authentication**
   - Simple username/password authentication
   - Suitable for testing and API access

4. **In-Memory H2 Database**
   - Easy setup without external database
   - Suitable for demonstration

5. **Comprehensive API**
   - Public endpoints for all users
   - User-specific endpoints
   - Admin-specific endpoints

## Screenshots

Screenshots of various test scenarios are stored in the `screenshots/` folder:
- Login with valid credentials
- User accessing allowed endpoints
- User denied access to admin endpoints
- Admin accessing admin endpoints
- Unauthorized access attempts

## Error Handling

### 401 Unauthorized
Returned when:
- No authentication credentials provided
- Invalid authentication credentials (wrong password)
- Expired session

**Response Example:**
```json
{
  "timestamp": "2024-04-06T10:30:00.000Z",
  "status": 401,
  "error": "Unauthorized",
  "message": "Full authentication is required to access this resource"
}
```

### 403 Forbidden
Returned when:
- User authenticated but lacks required role
- Insufficient permissions for the endpoint

**Response Example:**
```json
{
  "timestamp": "2024-04-06T10:30:00.000Z",
  "status": 403,
  "error": "Forbidden",
  "message": "Access Denied"
}
```

## Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key |
| username | VARCHAR(255) | Unique username |
| password | VARCHAR(255) | BCrypt encoded password |
| role_id | BIGINT | Foreign key to roles table |
| enabled | BOOLEAN | User enabled status |

### Roles Table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key |
| name | VARCHAR(255) | Unique role name (ROLE_USER, ROLE_ADMIN) |

## Logging

The application includes comprehensive logging:
- Spring Security debug logs
- SQL query logs
- Application-level debug logs

Configure logging in `application.properties`:
```properties
logging.level.org.springframework.security=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.com.example.experiment7=DEBUG
```

## H2 Database Console

Access H2 console at: `http://localhost:8080/h2-console`

**Connection Details:**
- Driver Class: `org.h2.Driver`
- JDBC URL: `jdbc:h2:mem:testdb`
- User Name: `sa`
- Password: (leave empty)

## Testing Checklist

- [x] Public endpoint accessible without authentication
- [x] User login with valid credentials
- [x] User accessing allowed endpoints
- [x] User denied access to admin endpoints (403 Forbidden)
- [x] Unauthenticated access to protected endpoints (401 Unauthorized)
- [x] Admin accessing all endpoints
- [x] Admin accessing user endpoints
- [x] Admin accessing admin endpoints

## Known Limitations

1. Currently uses HTTP Basic Auth (suitable for testing)
2. No token-based authentication (JWT)
3. No user registration endpoint
4. Passwords are fixed in data.sql
5. H2 database is in-memory (resets on restart)

## Future Enhancements

1. Implement JWT token-based authentication
2. Add user registration endpoint
3. Implement OTP/2FA
4. Add database persistence (MySQL/PostgreSQL)
5. Add role-based permissions for specific data
6. Implement audit logging
7. Add API documentation with Swagger/OpenAPI

## Conclusion

This project demonstrates a complete implementation of Role-Based Access Control in Spring Boot. It showcases:
- Proper use of Spring Security
- Role-based endpoint protection
- Secure password storage
- Database-driven user and role management
- Proper HTTP status codes for authorization

## License
This project is for educational purposes.

---
**Deadline:** 07 April 2026, Evening
**Submission:** Google Form (Details in assignment guide)
