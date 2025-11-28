# Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### Method 1: Using Vercel Dashboard (Recommended)

#### Deploy Backend

1. **Go to Vercel Dashboard**

   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub

2. **Import Project**

   - Click "New Project"
   - Import from GitHub: `Nikhil-Chhapekar/LMS`
   - Choose "lms-full-stack" repository

3. **Configure Backend**

   - **Project Name**: `lms-backend`
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: Leave empty (uses package.json)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Environment Variables** (CRITICAL!)
   Add these in Vercel dashboard under "Environment Variables":

   ```
   CURRENCY=USD
   PORT=5001
   MONGODB_URI= demo
   CLOUDINARY_NAME=demo
   CLOUDINARY_API_KEY=demo
   CLOUDINARY_SECRET_KEY=demo
   CLERK_WEBHOOK_SECRET=demo
   CLERK_PUBLISHABLE_KEY= demo
   CLERK_SECRET_KEY=demo
   STRIPE_WEBHOOK_SECRET=demo
   STRIPE_PUBLISHABLE_KEY=demo
   STRIPE_SECRET_KEY=demo
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note the backend URL (e.g., `https://lms-backend-xyz.vercel.app`)

#### Deploy Frontend

1. **Create New Project**

   - Click "New Project" again
   - Import the same repository

2. **Configure Frontend**

   - **Project Name**: `lms-frontend`
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables**
   Add these in Vercel dashboard:

   ```
   VITE_CLERK_PUBLISHABLE_KEY=
   VITE_BACKEND_URL=https://your-backend-url.vercel.app
   VITE_CURRENCY=$
   ```

   **Important**: Replace `https://your-backend-url.vercel.app` with the actual backend URL from step 5 above.

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Method 2: Using Vercel CLI

1. **Login to Vercel**

   ```bash
   vercel login
   ```

2. **Deploy Backend**

   ```bash
   cd server
   vercel --prod
   ```

3. **Deploy Frontend**
   ```bash
   cd ../client
   vercel --prod
   ```

## 🔧 Post-Deployment Configuration

### Update Clerk Settings

1. Go to Clerk Dashboard
2. Update allowed origins to include your Vercel URLs
3. Update webhook endpoints if needed

### Update Stripe Settings

1. Go to Stripe Dashboard
2. Update webhook endpoints to point to your Vercel backend
3. Test payment functionality

### Test Your Deployment

1. Visit your frontend URL
2. Test user registration/login
3. Test course creation (as educator)
4. Test course enrollment (as student)

## 🐛 Troubleshooting

### Common Issues

1. **Environment Variables Not Working**

   - Ensure all variables are set in Vercel dashboard
   - Redeploy after adding variables

2. **CORS Errors**

   - Check that frontend URL is allowed in backend CORS settings
   - Verify VITE_BACKEND_URL is correct

3. **Database Connection Issues**

   - Verify MongoDB URI is correct
   - Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for Vercel)

4. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json

## 📱 Your Deployed URLs

After deployment, you'll have:

- **Frontend**: `https://lms-frontend-xyz.vercel.app`
- **Backend**: `https://lms-backend-xyz.vercel.app`

## 🎉 Success!

Your LMS application is now live on Vercel! Share your frontend URL with users to access the application.
