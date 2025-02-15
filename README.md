# Online Betting Dashboard

A full-stack online betting dashboard built with Node.js, Express, PostgreSQL, Redis, and TypeScript. This project provides a RESTful API with authentication and events management, complete with caching and pagination support. The architecture is designed with scalability and maintainability in mind by abstracting the database and caching layers.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Scalability & Abstraction](#scalability--abstraction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Docker & Docker Compose](#docker--docker-compose)
  - [Local Development](#local-development)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Features

- **Backend (Node.js/Express/TypeScript):**

  - CRUD API endpoints for sports events.
  - User authentication using JWT (with bcryptjs for password hashing).
  - Database interactions using PostgreSQL via Knex with migrations and seeders.
  - Caching layer using Redis to minimize database load.
  - Pagination support in event listings for handling large datasets.
  - Repository and caching abstractions to enable easy swapping of underlying services.

- **Scalability:**

  - **Caching:**  
    Critical endpoints (e.g., fetching events) first check Redis cache. This reduces the number of database calls when load increases.
  - **Pagination:**  
    Although seeded with 5 events initially, the API supports pagination for efficient handling when the number of events grows.
  - **Abstraction Layers:**  
    Database and cache logic is abstracted in repository and cache service layers. Future changes (e.g., switching databases or caching solutions) require changes only in these layers.

- **Testing:**
  - Unit tests for services using Jest and ts-jest ensure that business logic is working correctly.
  - Mocks are used for database and cache dependencies to keep tests isolated.

---

## Project Structure

my-express-app/ ├── .env # Environment variables ├── knexfile.ts # Knex configuration for migrations and seeds ├── docker-compose.yml # Docker Compose file to run services (backend, PostgreSQL, Redis) ├── Dockerfile # Dockerfile for the backend ├── package.json ├── tsconfig.json └── src/ ├── app.ts # Express app configuration (includes CORS) ├── server.ts # Entry point: runs DB migrations, seeders, then starts the server ├── config/ │ └── db.ts # Knex DB connection configuration ├── cache/ │ ├── redisClient.ts # Redis client configuration (with fallback for bcrypt) │ └── cache.service.ts# Cache abstraction (get, set, delete, delete by pattern) ├── database/ │ └── init.ts # Runs migrations and seeders on startup └── modules/ ├── auth/ # Authentication module │ ├── auth.interfaces.ts │ ├── auth.repository.ts │ ├── auth.service.ts │ ├── auth.validators.ts │ └── auth.routes.ts └── events/ # Events module ├── events.interfaces.ts ├── events.repository.ts ├── events.service.ts ├── events.validators.ts └── events.routes.ts

markdown
Copy

---

## Scalability & Abstraction

- **Caching:**  
  The `getAllEvents` and `getEventById` service functions first attempt to retrieve data from Redis. On a cache miss, data is fetched from the database and then cached for future requests. This design minimizes database load under high usage.

- **Pagination:**  
  The API supports pagination through query parameters (e.g., `?page=1&pageSize=10`), enabling efficient handling of large datasets. Even though we start with a small number of events, this mechanism is in place for future growth.

- **Abstraction Layers:**  
  The repository layer abstracts all database operations and the cache service abstracts Redis operations. This means that if you decide to switch to another database or caching solution in the future, you only need to update these layers without modifying business logic in services or controllers.

- **Unit Tests:**  
  Comprehensive unit tests are written using Jest. External dependencies (like database and cache calls) are mocked to isolate and verify the business logic.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 14.x)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### Docker & Docker Compose

The project is containerized. Use the provided `Dockerfile` and `docker-compose.yml` to set up the environment.

1. **Build and start containers:**

   ```bash
   docker-compose up --build
   ```
