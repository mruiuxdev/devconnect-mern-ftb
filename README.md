
# Mern Devconnect

A simple project that includes login, register, authentication, dashboard profile with the ability to edit, and add experience and education. It also includes the ability to delete experiences and education. Additionally, there is a post feature that allows users to add likes, remove likes, add comments, and remove them. Here is a brief overview of the project:

Frontend:

React.js for the user interface and state management
React-Redux for managing application state
React-Bootstrap for UI components and layout
Sass for styling
Backend:

Node.js and Express.js for the server-side code
MongoDB for the database
JSON Web Tokens (JWT) for authentication and authorization
Bcrypt.js for password hashing
Functionality:

User registration with validation and password hashing
User login with validation and JWT generation
Authentication and authorization using JWT
User profile dashboard with the ability to edit and update user information
Add and delete experiences to user profile
Add and delete education to user profile
Post feature that allows users to add likes, remove likes, add comments, and remove comments
The project can be broken down into several components and features, including registration, login, authentication, dashboard, profile, experiences, education, posts, likes, and comments. Each component has its own set of functionalities that are handled by the server-side code and the frontend code.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Frontend
create file .env inside src

`REACT_APP_API_URL`=`http://localhost:5000/api` for backend api that runs on port 5000

### Backend

`PORT`=`5000`

`DB_MONGO_URI`=`HERE_MONGODB_URL`

`JWT_SECRET`=`TYPE_ANYRANDOM_LETTERS_NUMBERS`

`JWT_EXPIRES`=`TYPE_TIME` ex: 7d => 7 days

`GITHUB_CLIENT_ID`=`ID` Create OAuth App for github => setting developer to get Client ID and Secret

`GITHUB_CLIENT_SECRET`=`SECRET`


## Run project

To run this project

install all npm packages for frontend and backend

cd frontend 
```bash
  npm i
```  

cd backend 
```bash
  npm i
``` 
 ```bash
  npm start => for run server backend and frontend both
```  
## API Reference
The postman api file inside backend, import it to the postman app

