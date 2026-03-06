# ExpenseAPI

> A RESTful API for personal expense management with JWT authentication, category filtering, and monthly statistics.

![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)
![Swagger](https://img.shields.io/badge/Swagger-Docs-85EA2D?style=flat-square&logo=swagger)

## What is this project?

ExpenseAPI is a REST API that allows users to register, log in, and manage
their personal expenses. Each user can only access their own data. Built as a portfolio
project to demonstrate backend development with Node.js, showcasing a different stack
from my Java/Spring Boot projects.

Full API documentation available via Swagger UI at `/api-docs` when running locally.

## Features

- JWT-based authentication (register & login)
- Full CRUD for personal expenses
- Expense filtering by category, month, and year
- Paginated expense listing
- Expense summary with totals grouped by category and by month
- Input validation with Zod on all endpoints
- Interactive API documentation with Swagger UI

## Tech Stack

- **Node.js** + **Express** — HTTP server and routing
- **Prisma ORM v5** — type-safe database access and migrations
- **MySQL 8** — relational database
- **JWT (jsonwebtoken)** — stateless authentication
- **bcryptjs** — password hashing
- **Zod** — request body validation
- **swagger-jsdoc** + **swagger-ui-express** — API documentation

## Architecture

The project follows a layered architecture to keep responsibilities separated:

**Routes** define the available endpoints and apply middlewares.
**Middlewares** handle cross-cutting concerns — `auth.js` verifies the JWT and attaches
the user to the request, `validate.js` runs Zod schemas before reaching the controller.
**Controllers** receive the HTTP request, call the corresponding service, and return
the response. They contain no business logic.
**Services** encapsulate all business logic and interact with the database through
the Prisma client.

This separation makes each layer independently testable and easy to extend.

## Project Structure

```
expense-tracker-api/
├── src/
│   ├── config/
│   │   ├── prisma.js         # Prisma client singleton
│   │   └── swagger.js        # Swagger configuration and schemas
│   ├── middlewares/
│   │   ├── auth.js           # JWT verification
│   │   └── validate.js       # Zod request validation
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── expense.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── expense.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── expense.service.js
│   ├── schemas/
│   │   └── expense.schema.js
│   └── app.js
├── prisma/
│   └── schema.prisma
├── .env.example
├── .gitignore
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8

### Setup

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/UlisesF04/ExpenseAPI
cd ExpenseAPI
npm install
```

2. Create the database:

```sql
CREATE DATABASE expense_tracker;
```

3. Create a `.env` file in the project root using `.env.example` as a reference:

```
DATABASE_URL="mysql://your_user:your_password@localhost:3306/expense_tracker"
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Seed the categories:

```sql
INSERT INTO Category (name) VALUES
('Food'), ('Transport'), ('Housing'), ('Health'),
('Entertainment'), ('Education'), ('Clothing'), ('Other');
```

6. Start the server:

```bash
npm run dev
```

Server runs at `http://localhost:3000`.  
Swagger UI available at `http://localhost:3000/api-docs`.

## API Reference

### Authentication

| Method | Endpoint         | Auth | Description           |
| ------ | ---------------- | ---- | --------------------- |
| POST   | `/auth/register` | ❌   | Register a new user   |
| POST   | `/auth/login`    | ❌   | Login and receive JWT |

### Expenses

| Method | Endpoint               | Auth | Description                           |
| ------ | ---------------------- | ---- | ------------------------------------- |
| GET    | `/expenses`            | ✅   | List expenses (paginated, filterable) |
| POST   | `/expenses`            | ✅   | Create a new expense                  |
| GET    | `/expenses/:id`        | ✅   | Get a single expense                  |
| PUT    | `/expenses/:id`        | ✅   | Update an expense                     |
| DELETE | `/expenses/:id`        | ✅   | Delete an expense                     |
| GET    | `/expenses/summary`    | ✅   | Get totals by category and month      |
| GET    | `/expenses/categories` | ✅   | List all available categories         |

### Query Parameters for `GET /expenses`

| Parameter    | Type    | Description                  |
| ------------ | ------- | ---------------------------- |
| `categoryId` | integer | Filter by category           |
| `month`      | integer | Filter by month (1-12)       |
| `year`       | integer | Filter by year               |
| `page`       | integer | Page number (default: 1)     |
| `limit`      | integer | Items per page (default: 10) |

## Author

**Ulises Fernandez**  
[LinkedIn](https://linkedin.com/in/ulises-fernández-a6620a259)
