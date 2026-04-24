# Build & Run Instructions for Experiment-7

## Prerequisites
- **Java 17 or higher** installed
- **Maven 3.6 or higher** installed
- **Postman** installed (for testing)

## Verify Prerequisites

### Check Java Version
```bash
java -version
```
Should show Java 17 or higher.

### Check Maven Version
```bash
mvn -version
```
Should show Maven 3.6.0 or higher.

---

## Step 1: Navigate to Project Directory
```bash
cd c:\Users\Sai._.BVS\OneDrive\Desktop\FSD-2\Experiment-7
```

---

## Step 2: Clean and Build Project
```bash
mvn clean install
```

**Output should show:**
```
[INFO] BUILD SUCCESS
```

### Troubleshooting Build Issues

**Issue: `mvn: command not found`**
- Solution: Add Maven to PATH environment variable

**Issue: `Java version mismatch`**
- Solution: Update Java to version 17+ or configure Maven to use Java 17

**Issue: Dependency download fails**
- Solution: Check internet connection, or configure Maven proxy

---

## Step 3: Run the Application

### Option A: Using Maven Plugin (Recommended)
```bash
mvn spring-boot:run
```

### Option B: Using Java Command
```bash
java -jar target/experiment7-1.0.0.jar
```

### Wait for Startup Message
Look for this message in console:
```
Started Experiment7Application in X.XXX seconds
```

---

## Step 4: Verify Application is Running

### Option 1: Via Postman
1. Send GET request to: `http://localhost:8080/api/public/hello`
2. Should receive 200 OK with response: `{"message": "This is a public endpoint"}`

### Option 2: Via Browser
1. Open: `http://localhost:8080/api/public/hello`
2. Should display JSON response

### Option 3: Via curl (Command Line)
```bash
curl -X GET http://localhost:8080/api/public/hello
```

---

## Step 5: Access H2 Database Console

1. Open browser and go to: `http://localhost:8080/h2-console`
2. Use credentials:
   - **JDBC URL**: `jdbc:h2:mem:testdb`
   - **Username**: `sa`
   - **Password**: (leave empty)
3. Click **Connect**

### View Database Tables
```sql
SELECT * FROM USERS;
SELECT * FROM ROLES;
```

---

## Step 6: Import Postman Collection

1. Open Postman
2. Click **Import** button
3. Browse to: `Experiment-7-RBAC.postman_collection.json`
4. Click **Import**
5. Run test requests from collection

---

## Running Specific Commands

### Build Only (Skip Tests)
```bash
mvn clean install -DskipTests
```

### Run Tests Only
```bash
mvn test
```

### Run Specific Test
```bash
mvn test -Dtest=Experiment7ApplicationTests#testPublicEndpointAccessWithoutAuth
```

### Check Dependencies
```bash
mvn dependency:tree
```

---

## Project Structure Verification

After build, verify directory structure:
```
Experiment-7/
├── target/                          # Build output
│   ├── classes/                    # Compiled classes
│   ├── test-classes/               # Compiled tests
│   └── experiment7-1.0.0.jar       # Built JAR
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/experiment7/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       ├── entity/
│   │   │       ├── repository/
│   │   │       ├── service/
│   │   │       └── Experiment7Application.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
│       └── java/
│           └── com/example/experiment7/
│               └── Experiment7ApplicationTests.java
├── screenshots/                     # Test screenshots
├── pom.xml
├── README.md
├── TESTING_GUIDE.md
├── BUILD_AND_RUN.md
├── .gitignore
└── Experiment-7-RBAC.postman_collection.json
```

---

## Environment Variables (Optional)

Set custom application properties:

### Via Command Line
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=9090"
```

### Via Environment Variable
```bash
set SERVER_PORT=9090
mvn spring-boot:run
```

### Via application.properties
Edit `src/main/resources/application.properties`:
```properties
server.port=9090
```

---

## Port Configuration

Default port: **8080**

To change port, edit `application.properties`:
```properties
server.port=9090
```

---

## Stop the Application

### Method 1: Console
Press `Ctrl + C`

### Method 2: Kill Process (Windows)
```bash
# Find process on port 8080
netstat -ano | findstr :8080

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Method 3: Kill Process (Linux/Mac)
```bash
# Find process on port 8080
lsof -i :8080

# Kill process (replace PID)
kill -9 <PID>
```

---

## IDE Setup (Optional)

### For IntelliJ IDEA
1. File → Open → Select Experiment-7 folder
2. Maven will auto-configure
3. Right-click `pom.xml` → Maven → Reload projects
4. Run → Edit Configurations → Add Spring Boot configuration
5. Select main class: `Experiment7Application`
6. Click **Run**

### For Eclipse
1. File → Import → Maven → Existing Maven Projects
2. Browse to Experiment-7 folder
3. Click Finish
4. Right-click project → Run As → Spring Boot App

### For VS Code
1. Install extensions:
   - Extension Pack for Java
   - Spring Boot Extension Pack
2. Open folder: Experiment-7
3. Wait for Maven to load
4. Press `F5` to run application

---

## Troubleshooting Build/Run Issues

### Issue: `[ERROR] BUILD FAILURE`
**Solution**: Check Java version is 17+
```bash
java -version
```

### Issue: `Port 8080 already in use`
**Solution**: Kill existing process or use different port
```bash
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Issue: `[ERROR] Fatal error compiling: invalid target release: 17`
**Solution**: Ensure Maven is using Java 17
```bash
mvn -v
```

### Issue: `Database error on startup`
**Solution**: Check `data.sql` is in `src/main/resources/`

### Issue: `org.springframework.security.authentication.BadCredentialsException`
**Solution**: Verify password in data.sql matches test credentials
- user1: `user123`
- admin1: `admin123`

---

## Verify All Tests Pass

```bash
mvn test
```

**Expected output:**
```
[INFO] Tests run: 7, Failures: 0, Errors: 0, Skipped: 0
```

---

## Generate Build Report

```bash
mvn site
```

Report will be at: `target/site/index.html`

---

## Clean Up Build Files

```bash
mvn clean
```

This removes the `target/` folder.

---

## Next Steps

1. ✅ Application running on `http://localhost:8080`
2. ✅ H2 database accessible at `http://localhost:8080/h2-console`
3. ✅ Postman collection imported
4. ✅ Ready for testing
5. → Go to [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed test cases
6. → Capture required screenshots
7. → Update README with test results
8. → Submit to Google Form

---

## Quick Reference Commands

```bash
# Build and run
mvn clean install && mvn spring-boot:run

# Build only
mvn clean install -DskipTests

# Run tests
mvn test

# Check dependencies
mvn dependency:tree

# Build JAR
mvn package

# Run JAR directly
java -jar target/experiment7-1.0.0.jar

# Run on different port
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=9090"
```

---

**Experiment-7 RBAC Application Ready! 🚀**
**Deadline: 07 April 2026, Evening**
