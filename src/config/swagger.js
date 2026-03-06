import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API",
      version: "1.0.0",
      description:
        "REST API for personal expense tracking with JWT authentication",
    },
    servers: [{ url: "http://localhost:3000", description: "Local server" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            username: { type: "string", example: "ulises" },
            email: { type: "string", example: "ulises@email.com" },
            password: { type: "string", example: "Test1234!" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: { type: "string", example: "ulises" },
            password: { type: "string", example: "Test1234!" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        Expense: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            amount: { type: "number", example: 1500.0 },
            description: { type: "string", example: "Lunch" },
            date: { type: "string", format: "date-time" },
            userId: { type: "integer", example: 1 },
            categoryId: { type: "integer", example: 1 },
            category: {
              type: "object",
              properties: {
                id: { type: "integer", example: 1 },
                name: { type: "string", example: "Food" },
              },
            },
          },
        },
        CreateExpenseRequest: {
          type: "object",
          required: ["amount", "categoryId"],
          properties: {
            amount: { type: "number", example: 1500.0 },
            description: { type: "string", example: "Lunch" },
            date: {
              type: "string",
              format: "date-time",
              example: "2026-03-06T12:00:00.000Z",
            },
            categoryId: { type: "integer", example: 1 },
          },
        },
        UpdateExpenseRequest: {
          type: "object",
          properties: {
            amount: { type: "number", example: 2000.0 },
            description: { type: "string", example: "Diner" },
            date: { type: "string", format: "date-time" },
            categoryId: { type: "integer", example: 2 },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Food" },
          },
        },
        Summary: {
          type: "object",
          properties: {
            total: { type: "number", example: 15000.0 },
            byCategory: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  category: { type: "string", example: "Food" },
                  amount: { type: "number", example: 5000.0 },
                },
              },
            },
            byMonth: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  month: { type: "string", example: "2026-03" },
                  amount: { type: "number", example: 15000.0 },
                },
              },
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Error message" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerJsdoc(options);
