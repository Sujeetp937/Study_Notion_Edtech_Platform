# StudyNotion – MERN Stack EdTech Platform

## Overview

StudyNotion is a full-stack EdTech platform built using the MERN stack. The platform allows instructors to create and manage courses while students can enroll in courses, make payments, and track learning progress.

The application includes authentication, course management, Razorpay payment integration, Cloudinary media storage, email verification, password reset functionality, ratings & reviews, and responsive UI.

---

## 🚀 Live Link

https://study-notion-edtech-platform-18.vercel.app


---
# Features

## Student Features

* User Authentication (Signup/Login)
* Email Verification with OTP
* Reset Password Functionality
* Browse Course Categories
* Enroll in Courses
* Razorpay Payment Integration
* Watch Course Videos
* Track Course Progress
* Add Ratings and Reviews
* Responsive Dashboard

## Instructor Features

* Create Courses
* Add Sections and Subsections
* Upload Course Thumbnails
* Manage Published Courses
* View Instructor Dashboard
* Edit/Delete Courses

## Admin Features

* Create Categories
* Manage Platform Data

---

# Tech Stack

## Frontend

* React.js
* Vite
* Redux Toolkit
* Tailwind CSS
* React Router DOM
* Axios
* Swiper.js

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Nodemailer
* Razorpay
* Cloudinary

## Database

* MongoDB Atlas

## Deployment

* Frontend: Vercel
* Backend: Render

---

# Folder Structure

```bash
StudyNotion/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── mails/
│   └── package.json
│
└── README.md
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/your-username/studynotion.git
cd studynotion
```

---

# Backend Setup

## Navigate to backend folder

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email
MAIL_PASS=your_app_password

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=StudyNotion

RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

## Run backend server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Navigate to frontend folder

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
VITE_BASE_URL=http://localhost:5000/api/v1
VITE_RAZORPAY_KEY=your_razorpay_key
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Routes

## Authentication

* POST `/api/v1/auth/signup`
* POST `/api/v1/auth/login`
* POST `/api/v1/auth/sendotp`
* POST `/api/v1/auth/reset-password-token`
* POST `/api/v1/auth/reset-password`

## Courses

* POST `/api/v1/course/createCourse`
* GET `/api/v1/course/showAllCategories`
* POST `/api/v1/course/getCategoryPageDetails`

## Payments

* POST `/api/v1/payment/capturePayment`
* POST `/api/v1/payment/verifySignature`

## Ratings & Reviews

* POST `/api/v1/course/createRating`
* GET `/api/v1/course/getReviews`

---

# Razorpay Test Card

Use the following test card for payment testing:

```text
Card Number: 4111 1111 1111 1111
Expiry Date: 12/30
CVV: 123
OTP: 1234
```

---

# Deployment

## Frontend Deployment (Vercel)

1. Push project to GitHub
2. Import repository in Vercel
3. Set root directory to `frontend`
4. Add environment variables
5. Deploy

## Backend Deployment (Render)

1. Create Web Service on Render
2. Connect GitHub repository
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

---

# Future Enhancements

* Live Classes Integration
* AI-Based Course Recommendations
* Certificate Generation
* Discussion Forums
* Multi-Language Support
* Dark/Light Theme


---

# Screenshots

Add project screenshots here.

---

# Author

Developed by Sujeet Pal.

---

# License

This project is developed for educational and learning purposes.
