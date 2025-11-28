# Deployment Guide

This guide will help you deploy the LMS application to various platforms.

## 🚀 Vercel Deployment (Recommended)

### Frontend Deployment

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**
   Add these environment variables in Vercel dashboard:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_BACKEND_URL=https://your-backend-url.vercel.app
   VITE_CURRENCY=$
   ```

### Backend Deployment

1. **Create New Vercel Project**
   - Import the same repository
   - Root Directory: `server`
   - Framework Preset: `Other`

2. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

## 🐳 Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

1. **Create Dockerfile for Backend**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5001
   CMD ["npm", "start"]
   ```

2. **Create Dockerfile for Frontend**
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

3. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   services:
     backend:
       build: ./server
       ports:
         - "5001:5001"
       environment:
         - NODE_ENV=production
       env_file:
         - ./server/.env

     frontend:
       build: ./client
       ports:
         - "80:80"
       depends_on:
         - backend
   ```

4. **Deploy**
   ```bash
   docker-compose up -d
   ```

## ☁️ AWS Deployment

### Using AWS Amplify (Frontend)

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository
   - Select the `client` folder as root

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
   ```

### Using AWS Lambda (Backend)

1. **Install Serverless Framework**
   ```bash
   npm install -g serverless
   ```

2. **Create serverless.yml**
   ```yaml
   service: lms-backend
   provider:
     name: aws
     runtime: nodejs18.x
     region: us-east-1
   functions:
     api:
       handler: server.handler
       events:
         - http:
             path: /{proxy+}
             method: ANY
   ```

## 🌐 Netlify Deployment (Frontend)

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`

3. **Environment Variables**
   Add in Netlify dashboard:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_key
   VITE_BACKEND_URL=your_backend_url
   VITE_CURRENCY=$
   ```

## 🔧 Environment Setup for Production

### Required Services

1. **MongoDB Atlas**
   - Create cluster at [mongodb.com](https://mongodb.com)
   - Get connection string
   - Whitelist deployment IPs

2. **Clerk Authentication**
   - Setup at [clerk.com](https://clerk.com)
   - Get publishable and secret keys
   - Configure webhooks

3. **Cloudinary**
   - Setup at [cloudinary.com](https://cloudinary.com)
   - Get cloud name, API key, and secret

4. **Stripe**
   - Setup at [stripe.com](https://stripe.com)
   - Get publishable and secret keys
   - Configure webhooks

### Security Checklist

- [ ] All environment variables are set
- [ ] Database connection is secure
- [ ] API keys are not exposed in frontend
- [ ] CORS is properly configured
- [ ] HTTPS is enabled
- [ ] Webhooks are secured

## 📊 Monitoring

### Recommended Tools

- **Vercel Analytics** - For frontend monitoring
- **MongoDB Atlas Monitoring** - Database performance
- **Stripe Dashboard** - Payment monitoring
- **Clerk Dashboard** - Authentication analytics

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check backend CORS configuration
   - Verify frontend URL in backend

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names (case-sensitive)

3. **Database Connection**
   - Verify MongoDB connection string
   - Check IP whitelist in MongoDB Atlas

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
