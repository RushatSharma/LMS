# LMS Full Stack Application

A comprehensive Learning Management System built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure login/signup with Clerk
- **Course Management**: Create, edit, and manage courses
- **Video Lectures**: Support for video content with YouTube integration
- **Payment Integration**: Stripe payment processing
- **File Uploads**: Cloudinary integration for images and media
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Role-based Access**: Student and Educator roles
- **Progress Tracking**: Track course completion and progress

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Clerk (Authentication)
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Cloudinary (File Storage)
- Stripe (Payments)
- Clerk (Authentication)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Clerk account
- Cloudinary account
- Stripe account

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/Nikhil-Chhapekar/LMS.git
cd LMS/lms-full-stack
```

### 2. Install dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

### 3. Environment Setup

#### Backend Environment
Copy `server/.env.example` to `server/.env` and fill in your credentials:

```bash
cd server
cp .env.example .env
```

#### Frontend Environment
Copy `client/.env.example` to `client/.env` and fill in your credentials:

```bash
cd ../client
cp .env.example .env
```

### 4. Database Setup

Make sure your MongoDB connection string is properly configured in `server/.env`.

## 🚀 Running the Application

### Option 1: Using the batch file (Windows)
```bash
./start-project.bat
```

### Option 2: Manual start

#### Start Backend Server
```bash
cd server
npm start
```

#### Start Frontend Development Server
```bash
cd client
npm run dev
```

## 📱 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **API Health Check**: http://localhost:5001

## 🔑 Environment Variables

### Server (.env)
- `MONGODB_URI`: MongoDB connection string
- `CLOUDINARY_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_SECRET_KEY`: Cloudinary secret key
- `CLERK_SECRET_KEY`: Clerk secret key
- `STRIPE_SECRET_KEY`: Stripe secret key

### Client (.env)
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `VITE_BACKEND_URL`: Backend API URL
- `VITE_CURRENCY`: Currency symbol

## 📚 API Endpoints

### Courses
- `GET /api/course/all` - Get all published courses
- `GET /api/course/:id` - Get course by ID

### Educator
- `POST /api/educator/add-course` - Add new course
- `GET /api/educator/courses` - Get educator's courses
- `GET /api/educator/dashboard` - Get dashboard data

### User
- `GET /api/user/data` - Get user data
- `POST /api/user/purchase` - Purchase course

## 🎯 Usage

1. **Sign up** as a student or educator
2. **Browse courses** on the home page
3. **Enroll in courses** using Stripe payment
4. **Create courses** as an educator
5. **Track progress** in enrolled courses

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Nikhil Chhapekar**
- GitHub: [@Nikhil-Chhapekar](https://github.com/Nikhil-Chhapekar)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database solution
- Clerk for authentication services
- Stripe for payment processing
- Cloudinary for media management
