# BrightFlow

![image](https://github.com/user-attachments/assets/3918016f-7083-4302-8c40-957c3ce66eaf)

---

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%3E=18.x-green?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3.x-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Table of Contents
- [Pre-requisites](#Pre-requisites)
- [Introduction](#Introduction)
- [Usage](#Usage)
- [Routes](#Routes)
- [Installation](#Installation)
- [Environment Variables](#Environment-Variables)

## Pre-requisites

- **NodeJS**: >= 18.x
- **NPM**: >= 6.x
- **PostgreSQL**: >= 14.x
- **AWS Account**: For S3 storage

## Introduction

BrightFlow, your complete solution for managing energy bills with ease. BrightFlow is an open-source platform designed to simplify the process of managing electricity bills, offering users a seamless experience from bill storage to data visualization.

## Features

- **User Authentication**: Secure registration and login system
- **PDF Upload**: Secure upload and storage of energy bills on AWS S3
- **Automatic Data Extraction**: Automatically extracts important information from PDFs
- **Data Visualization**: 
  - Interactive dashboard with consumption trends
  - Cost distribution pie charts
  - Historical consumption analysis
- **Bill Management**: 
  - Easy upload and download of bills
  - Search and filter functionality
  - Organized storage system

## Usage

You can access the production version through this [link](https://brightflow.vercel.app/). Registration and login are required to access the bills page and upload all your bills to process the data and display it on an analytical dashboard.

## Routes

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - New user registration
- `POST /auth/refresh` - Access token refresh

### Bills
- `GET /billets` - List all bills
- `POST /billets` - Upload a new bill
- `GET /billets/:id` - Get details of a specific bill

### User
- `GET /user/:id` - Fetch a user by their ID
- `GET /user/profile/:id` - Get user profile
- `POST /user` - Create a new user
- `PATCH /user/profile/:id` - Update profile data

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mkmuniz/BrightFlow.git
```

2. Install dependencies:
```bash
# Frontend
cd front
npm install

# Backend
cd back
npm install
```

3. Set up the database:
```bash
cd back
npx prisma migrate dev
```

4. Start the development servers:
```bash
# Frontend
cd front
npm run dev

# Backend
cd back
npm run dev
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/BrightFlow"
JWT_ACCESS_TOKEN_SECRET="your-access-token-secret"
JWT_REFRESH_TOKEN_SECRET="your-refresh-token-secret"

AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
S3_BUCKET="your-s3-bucket-name"
S3_REGION="your-s3-region"

CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

GEMINI_AI_API_KEY="your-gemini-api-key"

PORT=4000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY="your-google-recaptcha-site-key"
```