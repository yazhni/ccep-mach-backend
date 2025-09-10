CCEP MACH Microservices scaffold (Dockerized)

Services:
- user-service (port 4001)
- health-goal-service (port 4002)
- api-gateway (port 5000)
- frontend (served by nginx on port 3000)
- mongo (27017)

Run with Docker Compose:
  docker compose up --build

Each service has .env.example. Unit tests present as Jest skeletons (run locally without Docker).


