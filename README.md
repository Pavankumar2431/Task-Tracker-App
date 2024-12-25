# Task Tracking App

A simple Task Tracking Application built with React, Express, and MongoDB, allowing users to create, edit, delete, and manage tasks with authentication.

## Features

- **User Authentication**
  - Secure signup and login functionality.
  - Passwords hashed using bcrypt.
  - JWT-based authentication.

- **Task Management**
  - Create, edit, and delete tasks.
  - View tasks specific to the logged-in user.
  - Tasks include fields like name, description, due date, status, and priority.

- **RESTful API**
  - Endpoints for user management and task management.
  - Protected routes with JWT.

## Tech Stack

### Frontend
- React
- Axios
- React Router

### Backend
- Express.js
- MongoDB with Mongoose (hosted on Railway)
- bcrypt for password hashing
- JWT for authentication
- dotenv for environment variables

### Deployment
- **Frontend**: Deployed on Render.
- **Backend**: Deployed on Render.
- **Database**: MongoDB hosted on Railway.

### Miscellaneous
- CORS for cross-origin requests
- LocalStorage for storing tokens

## Deployment Links

- **Frontend**: [Live App URL](https://task-tracker-app-1.onrender.com/)

## Installation and Setup (Local Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Pavankumar2431/Task-Tracker-App.git
   cd task-tracker-app
2. **Set up the backend:**
    * Navigate to the <mark>backend</mark> folder.
    * Install dependencies:
      ```bash
      npm install
    * Create a <mark>.env</mark> file and configure the following variables:
      ```bash
      PORT=5000
      MONGO_URI=<your-mongodb-railway-uri>
      JWT_SECRET=<your-secret-key>
    * Start the backend server:
      ```bash
      node server.js
3. **Set up the frontend:**
    * Navigate to the <mark>frontend</mark> folder.
    * Install dependencies:
      ```bash
      npm install
    * Create a <mark>.env</mark> file and configure the following variables:
      ```bash
      REACT_APP_API_URL=https://your-backend-render-url.com
    * Start the backend server:
      ```bash
      npm start
4. **Access the app:**

    * Open your browser and go to <mark>http://localhost:3000</mark>.

## API Endpoints
### User Routes
  * <mark>POST /signup</mark>: Register a new user.
  * <mark>POST /login</mark>: Log in a user and receive a JWT.
### Task Routes
  * <mark>GET /tasks</mark>: Fetch all tasks for the authenticated user.
  * <mark>POST /tasks</mark>: Add a new task.
  * <mark>PATCH /tasks/:id</mark>: Update a task.
  * <mark>DELETE /tasks/:id</mark>: Delete a task.
### Usage
  * **Signup**: Create an account with a username, email, and password.
  * **Login**: Log in to your account to receive an authentication token.
  * **Tasks**: Create, edit, and manage your tasks.
### Authentication
  * The app uses **JWT** for authentication. The token is stored in <mark>localStorage</mark> on the frontend and included in the <mark>Authorization</mark> header for API requests.
### Deployment Steps
1. **MongoDB on Railway:**

    * Set up a Railway project and provision a MongoDB service.
    * Copy the connection string and update it in your backend <mark>.env</mark> file.
2. **Frontend on Render:**

    * Create a new web service on Render and point it to the frontend folder.
    * Add environment variables in Render (<mark>REACT_APP_API_URL</mark>).
3. **Backend on Render:**

    * Create a new web service on Render and point it to the <mark>backend</mark> folder.
    * Add environment variables in Render (<mark>PORT</mark>, <mark>MONGO_URI</mark>, <mark>JWT_SECRET</mark>).

## Future Enhancements
  * Add pagination and filtering for tasks.
  * Implement role-based access control.
  * Add a notification system for task due dates.
