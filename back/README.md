## Table of Contents
- [Pre Requisites](#pre-requisites)
- [Introduction](#-introduction)
- [Usage](#-usage)

## Pre Requisites

- **NodeJS**: >= 18.x
- **NPM**: >= 6.x
- **Docker**

## 📜 Introduction

Biflux is your comprehensive solution for managing energy bills with ease. It is an open-source platform designed to streamline the process of handling electricity bills, offering users a seamless experience from bill storage to insightful data visualization. Biflux provides an API for the registration, authentication, and storage of data from bills sent to an S3 bucket.

## 💻 Usage

1. **Install Dependencies**:
    - Navigate to the `back` folder and run `npm install`.

2. **Setup Docker**:
    - The project includes a `docker-compose.yml` file to build a container for the PostgreSQL database.
    - Fill out the `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` fields in the `docker-compose.yml` file.

3. **Run Docker**:
    - Start the Docker container by running: 
      ```sh
      sudo docker-compose up -d
      ```
    - Verify the container is up with:
      ```sh
      sudo docker ps
      ```

4. **Configure Environment Variables**:
    - Access the `.env` file and fill out the necessary information:
      ```env
      DATABASE_URL="postgres://your-username:your-password@localhost:5432/your-database?schema=public"
      JWT_ACCESS_SECRET=""
      JWT_REFRESH_SECRET=""
      ENVIRONMENT=""

      CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
      CLOUDINARY_API_KEY="your-cloudinary-api-jey"
      CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

      GEMINI_AI_API_KEY="your-gemini-api-key"
      
      PORT='4000'
      ```

5. **Run the API**:
    - Start the API server with:
      ```sh
      npm run dev
      ```
    - By default, the API will be accessible at `http://localhost:4000`.

6. **Apply Database Migrations**:
    - Update your database with migrations by running:
      ```sh
      npx prisma migrate dev
      ```

---

## 🔄 API Routes

### User Routes
- **GET /user**: Retrieves all users.
- **GET /user/:id**: Retrieves a user by ID.
- **POST /user**: Creates a new user.

### Billet Routes
- **GET /billet**: Retrieves all billets.
- **POST /billet**: Uploads a new billet.

### Auth Routes
- **GET /refreshtoken**: Retrieves all refresh tokens.
- **POST /refreshtoken**: Generates a new refresh token.
- **POST /login**: Authenticates a user and returns a token.
