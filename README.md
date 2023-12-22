# Firebase User Management Node.js Project

This project is a Firebase user management system built with Node.js, Express, and JWT. It includes Firebase functions and is set up for deployment.

## Getting Started

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Set up your Firebase project and replace the Firebase project details in the `example.env` file. Rename this file to `.env`.
4. Start the server using `npm start` for production or `npm run dev` for development.

## Project Structure

The project is structured as follows:

- [src/](/src/): Contains the main server files.
  - [controllers/](/src/controllers/): Contains the controller functions for user management.
  - [middlewares/](/src/middlewares/): Contains middleware functions.
  - [routes/](/src/routes/): Contains the Express routes.
  - [config/](/src/config/): Contains the Firebase configuration file.
- [functions/](/functions/): Contains the Firebase functions.
- `package.json`: Contains the project dependencies and scripts.

## Key Features

- User Registration: Users can register with their email and password.
- User Login: Registered users can login.
- JWT Authentication: User authentication is handled using JWT.
- Profile Image Upload: Users can upload their profile images.
- Firebase Functions: A Firebase function is set up to log user activity.
