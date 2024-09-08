# LearningManagementSystem_Backend
This repository consists of the backend code for the Learning Management System client.

### Features of this web application:
There are 2 main roles in this project: Student and Admin 

1. `Student` functionalities
    a. `User related`(/api/v1/user): features provided for students
    1. Create account(/register)
    2. Login(/login)
    3. Reset Password(/change-password)
    4. Profile(/me)
    5. Update profile(/me.id)
    6. Logout(/logout)

    b. `Course related`(/api/v1/courses): features related to courses
    1. List course(/): list of courses in LMS
    2. View course(/:id): click on each course and view its description

    c. `Payment related`: payment functionalities
    1. Subscribe: subscribe to a course by making a payment

2. `Admin` functionalities
    a. `User related`: admin controls
    1. Create account(with special role)
    2. Login
    3. Reset Password
    4. Profile
    5. Update profile
    6. Logout

    b. `Course related`: admin control on courses - create, read, update, delete
    1. List course
    2. View course
    3. Create course
    4. Edit course
    5. Delete course

    c. `Payment related`: admin monitoring over transactions
    1. List payments
    2. View payment

# Tech stack - MERN
1. `MongoDB`: database
2. `ExpressJS`: Server
3. `ReactJS`: frontend features and UI
4. `NodeJS`: development/runtime environment

# Arcitecture
`client` <------> `server` <------> `database`

- third party services used
1. `email`: for reset password
2. `payment gateway`: for subscription

# Folder architecture
1. `package.json`: framework and library used

2. `package-lock.json`: versions framework and library used

3. `sever.js`: server setup, app initiation

4. `app.js`: db connection, routes

5. `.env`: all credentials(passwords) and settings

6. `.gitignore`: ignore some files, credentials

7. Routes
    - `course.routes.js`
    - `miscellaneous.routes.js`
    - `payment.routes.js`
    - `user.routes.js`

8. Controllers
    - `course.controller.js`
    - `miscellaneous.controller.js`
    - `payment.controller.js`
    - `user.controller.js`

9. Configs
    - `dbConn.js`

10. Models
    - `course.model.js`
    - `payment.model.js`
    - `user.model.js`

11. Middlewares
    - `asyncHandler.middleware.js`
    - `auth.middleware.js`
    - `error.middleware.js`
    - `multer.middleware.js`

12. Utility
    - `appError.js`
    - `sendEmail.js`

# Setting up the project
1. Open terminal, install package manager
```
npm init
```
2. Install dependencies
```
npm i bcryptjs cloudinary cookie-parser cors dotenv express jsonwebtoken mongoose multer nodemailer
``` 
bcryptjs
cloudinary
cookie-parser
cors
dotenv
express: framework for server development
jsonwebtoken
mongoose
multer
nodemailer
morgan

3. To run the server install nodemon
```
npm i nodemon --save
```

4. To run the server
```
npm run dev
```