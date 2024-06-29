# Biflux

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%3E=18.x-green?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3.x-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Table of Contents
- [Pre Requisites](#pre-requisites)
- [Introduction](#-introduction)
- [Usage](#-usage)

## Pre Requisites

- **NodeJS**: >= 18.x
- **NPM**: >= 6.x
- **Docker**

## 📜 Introduction

Biflux is your comprehensive solution for managing energy bills with ease. It is an open-source platform designed to streamline the process of handling electricity bills, offering users a seamless experience from bill storage to insightful data visualization.

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

This README provides clear instructions on setting up and running the Biflux project. If you need any further modifications, feel free to let me know!
