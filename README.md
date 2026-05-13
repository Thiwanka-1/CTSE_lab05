# Microservices Lab – SE4010

## Technology Stack

| Component       | Technology                                |
| --------------- | ----------------------------------------- |
| Item Service    | Node.js + Express                         |
| Order Service   | Node.js + Express                         |
| Payment Service | Node.js + Express                         |
| API Gateway     | Node.js + Express + http-proxy-middleware |

````

## Running the System

```bash
# Build all services
docker-compose build

# Start all containers (detached mode)
docker-compose up -d

# View running containers
docker ps

# View logs for a specific service
docker-compose logs itemservice

# Stop and remove all containers
docker-compose down
````

## Required API Endpoints (via API Gateway on port 8080)

### Item Service

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | /items      | Returns all items |
| POST   | /items      | Create a new item |
| GET    | /items/{id} | Get item by ID    |

### Order Service

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | /orders      | Returns all orders |
| POST   | /orders      | Place a new order  |
| GET    | /orders/{id} | Get order by ID    |

### Payment Service

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | /payments         | Returns all payments     |
| POST   | /payments/process | Process a payment        |
| GET    | /payments/{id}    | Get payment status by ID |
