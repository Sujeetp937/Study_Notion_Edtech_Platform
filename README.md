# StudyNotion – MERN Stack EdTech Platform

## Overview

StudyNotion is a production-ready full-stack EdTech platform built using the MERN stack. The platform enables instructors to create and manage courses while students can browse courses, enroll securely, make online payments, and track their learning progress.

The application features JWT authentication, OTP-based email verification, secure password reset, Razorpay payment integration, Cloudinary media management, role-based access control, ratings & reviews, and a responsive user interface. The backend is deployed on **AWS EC2** using **Nginx** and **PM2**, while the frontend is hosted on **Vercel** with a custom domain.

---

# 🚀 Live Demo

### Frontend
https://www.teachmate.tech

### Backend API
https://api.teachmate.tech

---

# Features

## Student Features

- User Authentication (Signup/Login)
- Email Verification using OTP
- Forgot & Reset Password
- Browse Course Categories
- Course Enrollment
- Razorpay Payment Integration
- Watch Course Videos
- Track Course Progress
- Ratings & Reviews
- Responsive Dashboard

## Instructor Features

- Create Courses
- Add Sections & Subsections
- Upload Course Thumbnails & Videos
- Publish/Unpublish Courses
- Edit/Delete Courses
- Instructor Dashboard

## Admin Features

- Manage Categories
- Manage Platform Data

---

# Tech Stack

## Frontend

- React.js
- Vite
- Redux Toolkit
- Tailwind CSS
- React Router DOM
- Axios
- Swiper.js

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Brevo (Transactional Email API)
- Razorpay
- Cloudinary

## Database

- MongoDB Atlas

## Deployment

- **Frontend:** Vercel
- **Backend:** AWS EC2
- **Reverse Proxy:** Nginx
- **Process Manager:** PM2
- **SSL:** Let's Encrypt
- **Domain:** teachmate.tech

---

# System Architecture

```text
                    +----------------------+
                    |   www.teachmate.tech |
                    |       (Vercel)       |
                    +----------+-----------+
                               |
                               |
                    REST API over HTTPS
                               |
                               v
                  +------------------------+
                  |  api.teachmate.tech    |
                  |   AWS EC2 + Nginx      |
                  |     Node.js/Express    |
                  +-----------+------------+
                              |
            +-----------------+-----------------+
            |                 |                 |
            |                 |                 |
     MongoDB Atlas      Cloudinary       Razorpay API
            |
      User & Course Data
```

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
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── mails/
│   ├── utils/
│   └── package.json
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Sujeetp937/Study_Notion_Edtech_Platform.git

cd Study_Notion_Edtech_Platform
```

---

# Backend Setup

Navigate to backend directory

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

BREVO_API_KEY=your_brevo_api_key

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=StudyNotion

RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

FRONTEND_URL=http://localhost:5173
```

Run backend

```bash
npm run dev
```

Backend URL

```text
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_BASE_URL=http://localhost:5000/api/v1

VITE_RAZORPAY_KEY=your_razorpay_key
```

Run frontend

```bash
npm run dev
```

Frontend URL

```text
http://localhost:5173
```

---

# API Routes

## Authentication

- POST `/api/v1/auth/signup`
- POST `/api/v1/auth/login`
- POST `/api/v1/auth/sendotp`
- POST `/api/v1/auth/reset-password-token`
- POST `/api/v1/auth/reset-password`

## Courses

- POST `/api/v1/course/createCourse`
- GET `/api/v1/course/showAllCategories`
- POST `/api/v1/course/getCategoryPageDetails`

## Payments

- POST `/api/v1/payment/capturePayment`
- POST `/api/v1/payment/verifySignature`

## Ratings & Reviews

- POST `/api/v1/course/createRating`
- GET `/api/v1/course/getReviews`

---

# Deployment

## Frontend (Vercel)

- Deploy React application on Vercel
- Configure environment variables
- Connect custom domain (`teachmate.tech`)
- Enable HTTPS

## Backend (AWS EC2)

- Launch Ubuntu EC2 Instance
- Configure Security Groups
- Install Node.js & NPM
- Clone GitHub Repository
- Configure Environment Variables
- Install Dependencies
- Configure PM2 for Process Management
- Configure Nginx Reverse Proxy
- Secure API using Let's Encrypt SSL
- Connect Backend with Custom Subdomain (`api.teachmate.tech`)

---

# Production Infrastructure

- AWS EC2 (Ubuntu)
- PM2 Process Manager
- Nginx Reverse Proxy
- Let's Encrypt SSL
- MongoDB Atlas
- Cloudinary CDN
- Brevo Transactional Email API
- Razorpay Payment Gateway
- Vercel Hosting
- Custom Domain Configuration

---

# Future Enhancements

- AI-Based Course Recommendations
- Live Classes
- Certificate Generation
- Discussion Forums
- Course Wishlist
- Notifications
- Multi-Language Support
- Dark/Light Theme

---


# Author

**Sujeet Pal**

- GitHub: https://github.com/Sujeetp937

---

# License

This project is developed for educational and learning purposes.
