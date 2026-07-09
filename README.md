# React eCommerce Website

A modern and responsive full-stack eCommerce web application built using **React, Vite, Node.js, Express, MongoDB, and Tailwind CSS**.

The application allows users to browse products, search and filter by category, manage their shopping cart, authenticate securely, and complete payments through the **eSewa Sandbox**.



## Features

### Frontend
- Home page with image slider (category navigation)
- Search functionality for products
- Category-based product filtering
- Product listing with ratings and price
- Product detail page
- Responsive shopping cart
- User authentication (Login/Register)
- eSewa Sandbox payment integration
- Payment success and failure pages
- Fully responsive (Mobile & Desktop)

### Backend
- RESTful API built with Express.js
- MongoDB database integration with Mongoose
- JWT-based user authentication
- Password hashing using bcrypt
- Cart management APIs
- eSewa payment signature generation
- Environment variable configuration using dotenv
- Secure API endpoints with authentication middleware



## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- Crypto (for eSewa signature generation)



## Payment Gateway

- eSewa Sandbox Integration
- Secure HMAC SHA-256 signature generation
- Payment success and failure handling
- Automatic cart clearing after successful payment



## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ESEWA_SECRET_KEY=your_esewa_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
VITE_ESEWA_SUCCESS_URL=http://localhost:5173/payment-success
VITE_ESEWA_FAILURE_URL=http://localhost:5173/payment-fail
```