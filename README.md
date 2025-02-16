# Movie-App-Backend---Node.js-MongoDB
A movie management backend built with Node.js, Express.js, and MongoDB. Supports JWT authentication, movie management, user favorites, watch later lists, and category-based filtering.


## 🔥 Features:
- ✅ User registration & login with hashed passwords (bcrypt)
- ✅ JWT-based authentication with refresh tokens
- ✅ Secure cookie storage for refresh tokens
- ✅ Role-based access control (RBAC)
- ✅ Movie management (CRUD operations)
- ✅ User favorites & watch later lists
- ✅ Category-based movie filtering
- ✅ MongoDB integration with Mongoose
- ✅ .env for environment variables

## 📌 Tech Stack:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- bcrypt for password hashing

## 🔗 Setup & Run:
- Clone the repo:
- git clone [https://github.com/Saeed-Youseef1/Movie-App-Backend---Node.js-MongoDB---Node.js-MongoDB.git](https://github.com/Saeed-Youseef1/Movie-App-Backend---Node.js-MongoDB.git)
- Install dependencies:
- Create a .env file and add:
- DATABASE_URL=your_mongodb_connection_string
- NODE_ENV=development
- PORT=5000
- ACCESS_TOKEN_SECRET=your_access_token_secret
- REFRESH_TOKEN_SECRET=your_refresh_token_secret
