# job-tracker-app
Job Tracker App – A fullstack MERN application that helps users manage their job applications and interviews in one place. Features include creating user account, adding new job applications & interview, updating status, deleting entries, viewing all applications, viewing analytics in a dashboard. Built with MongoDB, Express, React, and Node.js.

# Preview Job Tracker App
![job tracker app preview](https://github.com/user-attachments/assets/36eae4ca-4833-48b4-a6e2-8fda5a1efac2)

# Tech Stack
**Frontend***
-React JS (with React Router for navigation)
-Material UI (for UI components)
-Material UI Charts (for data visualization)

**Backend**
-Node JS + Express (REST API)
-MongoDB + Mongoose (database)

**Other**
-JWT Authentication (secure login & register)
-Bcrypt (password hashin)
-Mutler (handing file uploads)
-Cloudinary (cloud storage for uploaded files as user profile picture)

## Run the project locally
Follow these steps to run the project locally:

### 1.Clone the repository
-git clone git@github.com:Dimithri8/job-tracker-app.git
-cd job-tracker-app

### 2.Intall dependencies
The project has two parts: client (frontend) and server (backend).

To install backend dependencies
-cd backend
-npm install

To install frontend dependencies
-cd ../frontend
-npm install

### 3.Setup environment variables
In the backend folder, create a .env file and add the following:

-MONGO_URI=your_mongodb_connection_string
-JWT_SECRET=your_secret_key
-CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
-CLOUDINARY_API_KEY=your_cloudinary_api_key
-CLOUDINARY_API_SECRET=your_cloudinary_api_secret

### 4.Run the backend
-cd backend
-nodemon server.js

### 5.Run the frontend
Open a new terminal
-cd frontend
-npm run dev

## Future Work
Currently the app is optimized for desktop only.
Future improvements include: 
-Making the design fully responsive for mobile/tablet
-Adding email reminders for interviews

## Development Duration
This project was designed and developed in 1 week.

# Author
-Dimithri Dananjaya
-Linkedin: https://www.linkedin.com/in/dimithri-dananjaya-3b0507301/
-Github: https://github.com/Dimithri8/
