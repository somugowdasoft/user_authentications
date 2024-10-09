**User Authentication and Authorization API**
This Node.js application provides user authentication and authorization using Bearer tokens (JWT). It follows the MVC pattern with MongoDB as the database, using Mongoose for ORM, Express.js for routing, and JWT for token generation and verification. Each request is documented and tested using Postman.

**Features**
-User registration with hashed passwords.
-User login with JWT token generation.
-Authentication middleware to protect routes.
-Authorization to get user profile based on the JWT token.
-MongoDB for data persistence.
-Clean MVC structure.
-Error handling and input validation.
-API documentation with Postman.

**Installation**
**1.Clone this repository:**
```git clone https://github.com/your-repo-url.git
cd jwt-authentication-app
```
**2.Install dependencies:**
```npm install```
**3.Set up a .env file with the following variables:**
```MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
PORT=3000
```
**3.Start the server:**
```npm start
```

**Endpoints**
**1. Register User**
URL: /api/users/register
Method: POST
Description: Register a new user.
Request Body:
```{
  "username": "user1",
  "email": "user1@example.com",
  "password": "password123"
}
```

**Response:**
```{
  "message": "User registered successfully"
}
```
**2. Login User**
URL: /api/users/login
Method: POST
Description: Log in a user and get a JWT token.
Request Body:
```{
  "email": "user1@example.com",
  "password": "password123"
}
```
**Response**
```{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

**3. Get User Profile**
URL: /api/users/profile
Method: GET
Description: Get user profile, protected by JWT authentication.
Headers:
```Authorization: Bearer <token>
```

**Response:**
```{
  "username": "user1",
  "email": "user1@example.com"
}
```
