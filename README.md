# Online Betting Dashboard

A full-stack online betting dashboard built with Node.js, Express, PostgreSQL, Redis, and TypeScript. This project provides a RESTful API with authentication and events management, complete with caching and pagination support. The architecture is designed with scalability and maintainability in mind by abstracting the database and caching layers.

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
