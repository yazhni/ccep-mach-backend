# CCEP MACH Backend Microservices

This repository contains microservices for user management and health goal tracking, designed with MACH (Microservices, API-first, Cloud-native, Headless) principles.

---

## 1. Setup


### Local Development

Clone the repository and install dependencies for each service:

```sh
git clone <your-repo-url>
cd ccep-mach-backend

# For each service:
cd user-service
npm install

cd ../health-goal-service
npm install

cd ../api-gateway
npm install
```

### Environment Variables

env is present for each services it should contain port and mongo db uri

### Running Services Locally

Start MongoDB (locally or via Docker), then run each service in a separate terminal:

```sh
# User Service
cd user-service
npm run dev

# Health Goal Service
cd ../health-goal-service
npm run dev

# API Gateway
cd ../api-gateway
npm run dev
```

Or use Docker Compose for all services:

```sh
docker-compose up --build
```

---

## 2. Usage

- **User Service:** Handles user registration, login, and profile.
- **Health Goal Service:** Manages CRUD operations for health goals.
- **API Gateway:** Single entry point for clients, proxies requests to the appropriate service.

Access the API Gateway at [http://localhost:5000](http://localhost:5000).

---

## 3. Design Decisions

- **Microservices:** Each domain (user, health goals) is a separate Node.js service.
- **API Gateway:** Centralizes routing, authentication, and service discovery.
- **MongoDB:** Used for persistent storage in each service.
- **Express.js:** Lightweight, flexible framework for REST APIs.
- **Validation:** Uses `express-validator` for input validation.
- **Authentication:** JWT-based authentication for secure endpoints.
- **Assumptions:** 
  - Each user can have multiple health goals.
  - Services communicate over HTTP using RESTful APIs.
  - User identity is passed via JWT and extracted in middleware.

---

## 4. MACH Principles

- **Microservices:** Independent, deployable services for user and health goals.
- **API-first:** All functionality is exposed via RESTful APIs.
- **Cloud-native:** Dockerfiles and `docker-compose.yml` provided for easy cloud/container deployment.
- **Headless:** No frontend; services are backend-only and can be consumed by any client.

---

## 5. API Reference

### User Service

| Method | Endpoint         | Description           |
|--------|------------------|----------------------|
| POST   | `/users/register`| Register a new user  |
| POST   | `/users/login`   | Login and get JWT    |
| GET    | `/users/me`      | Get current user info|

### Health Goal Service

| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | `/health-goals`       | Create a new health goal   |
| GET    | `/health-goals`       | List all health goals      |
| PUT    | `/health-goals/:id`   | Update a health goal       |
| DELETE | `/health-goals/:id`   | Delete a health goal       |

### API Gateway

Proxies all above endpoints under `/api/` (e.g., `/api/users/register`, `/api/health-goals`).

---

## 6. Testing

### Unit Tests

Each service contains unit tests for controllers and logic.

**Run tests:**

```sh
npm test
```

- Tests are located in the `src/tests/` or `src/controllers/` folders.
- Uses Jest for testing and mocking.

---

## 7. Optional Enhancements

- **Cloud Deployment:** Use Docker Compose or Kubernetes for cloud deployment (AWS ECS, Azure AKS, GCP GKE).
- **Frontend:** A simple React app can be added to interact with the API Gateway.
- **Infrastructure as Code:** Use Terraform or similar tools to provision cloud resources.
- **CI/CD:** Recommended to use GitHub Actions or similar for automated testing and deployment.

**Automated Testing & Deployment Approach:**
- All code changes trigger unit tests via CI

