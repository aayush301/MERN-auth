# MERN Full Authentication App
A MERN application for handling all the authentication and authorization for a user.  
[View Demo](https://mern-auth-aayush.herokuapp.com/)

Note:
- The frontend part of the project uses Vitejs as the front end build tool.
- The frontend part of the project was bootstrapped using the command `npm init vite`

## Table of Contents
* [Features](#features)
* [Application flow](#application-flow)
* [Tools and Technologies](#tools-and-technologies)
* [Dependencies](#dependencies)
* [Dev-dependencies](#dev-dependencies)
* [Prerequisites](#prerequisites)
* [Installation and setup](#installation-and-setup)
* [Backend API](#backend-api)
* [frontend pages](#frontend-pages)
* [npm scripts](#npm-scripts)
* [Useful Links](#useful-links)
* [Contact](#contact)


## Features
- Register/Signup
- Email Activation
- Login
- Forget password and reset password
- Dashboard
- View Profile
- Update Profile
- Logout

## Application flow
- Signup
  - A user is first required to create an account by signing up.
  - Once he signs up, an activation token is created by the backend and an email is sent to the registered email address for account activation.
  - Once user clicks on the button/link in the email, the activation token is verified and he gets registered successfully and can log in now.

- Auth
  - Upon login, a refresh token is sent in the cookie to the client application from the backend.
  - Since access token has limited validity period, for renewing access tokens, refresh token will be used by the client application. If the refresh token is valid, new access token will be generated and sent to client app.
  - When accessing the protected routes, the client app will need to send access token in the header field `Authorization` to the backend. Once the token is verified, the user can access the resources in that route.  
  
- If the user forgets a password:
  - When the user clicks on forget password, his email will be sent to the backend and the backend will create an access token and send reset password email to the user.
  - After clicking on the button/link, the user will be asked to enter a new password and the client app will send password in body along with access token in the header field `Authorization` to the backend.
  - After verification of access token, the password is updated.


## Tools and Technologies
- HTML
- CSS
- Javascript
- Node.js
- Express.js
- React
- Redux
- Mongodb
- Vitejs


## Dependencies
- axios
- react
- react-dom
- react-redux
- react-router-dom
- redux
- bcrypt
- cookie-parser
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- nodemailer


## Dev-dependencies
- @vitejs/plugin-react
- vite
- nodemon
- concurrently


## Prerequisites
- Node.js must be installed on the system.
- You should have a MongoDB database.
- You should have a code editor (preferred: VS Code)


## Installation and Setup
1. Download the source code in your desired location on your system.
2. Open the code in your code editor.
3. Go to terminal and type the following command and hit enter:
    ```sh
    npm run install-all
    ```
    This will install all the dependencies and dev-dependencies required at root, at frontend and at backend in your project.

4. Create a file named ".env" inside the backend folder and enter the following credentials:
    ```js
    MONGODB_URL = your-mongodb-url
    ACTIVATION_TOKEN_SECRET = any-random-secret
    ACCESS_TOKEN_SECRET = any-random-secret
    REFRESH_TOKEN_SECRET = any-random-secret
    CLIENT_BASE_URL = http://localhost:3000
    MAIL_SERVICE_EMAIL=your-email-id
    MAIL_SERVICE_PASSWORD=your-email-password
    ```

5. Go to terminal and type the following command and hit enter:
    ```sh
    npm run dev
    ```
    This will start both backend and frontend.

6. Open browser and go to url: http://localhost:3000. You can see the app running now.


## Backend API
<pre>
- POST    /api/auth/register
- POST    /api/auth/activate-account
- POST    /api/auth/login
- POST    /api/auth/renew-access-token
- POST    /api/auth/forgot-password
- POST    /api/auth/reset-password
- GET     /api/auth/logout
- GET     /api/users
- GET     /api/users/:id
- GET     /api/profile
- PUT     /api/profile
</pre>


## Frontend pages
<pre>
- /
- /auth/register
- /auth/login
- /auth/activate-account/:activationToken
- /auth/forgot-password
- /auth/reset-password/:accessToken
- /dashboard
- /profile
</pre>




## npm scripts
At root:
- `npm run dev`: Starts both backend and frontend
- `npm run dev-server`: Starts only backend
- `npm run dev-client`: Starts only frontend
- `npm run install-all`: Installs all dependencies and dev-dependencies required at root, at frontend and at backend.

Inside frontend folder:
- `npm run dev`: Starts frontend
- `npm run build`: build frontend for production
- `npm run preview`: locally preview production build

Inside backend folder:
- `npm run dev`: Starts backend using nodemon.
- `npm start`: Starts backend without nodemon.


## Useful Links
- This project
  - Demo: https://mern-auth-aayush.herokuapp.com/
  - Github Repo: https://github.com/aayush301/MERN-auth

- Official Docs
  - Reactjs docs: https://reactjs.org/docs/getting-started.html
  - npmjs docs: https://docs.npmjs.com/
  - Mongodb docs: https://docs.mongodb.com/manual/introduction/
  - Github docs: https://docs.github.com/en/get-started/quickstart/hello-world

- Youtube tutorials
  - Mern auth: https://youtu.be/npsi7ZkjvQo
  - Expressjs: https://youtu.be/L72fhGm1tfE
  - React: https://youtu.be/EHTWMpD6S_0
  - Redux: https://youtu.be/1oU_YGhT7ck

- Download links
  - Nodejs download: https://nodejs.org/
  - VS Code download: https://code.visualstudio.com/

- Cheatsheets
  - Git cheatsheet: https://education.github.com/git-cheat-sheet-education.pdf
  - VS Code keyboard shortcuts: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf
  - CSS Selectors Cheatsheet: https://frontend30.com/css-selectors-cheatsheet/


## Contact
- Email: aayush5521186@gmail.com
- Linkedin: https://www.linkedin.com/in/aayush12/
