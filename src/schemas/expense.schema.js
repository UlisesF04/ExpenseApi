import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be greater than 0"),
  description: z.string().max(255, "Description is too long").optional(),
  date: z.string().datetime({ message: "Invalid date format" }).optional(),
  categoryId: z
    .number({ invalid_type_error: "categoryId must be a number" })
    .int("categoryId must be an integer")
    .positive(),
});

export const updateExpenseSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0").optional(),
  description: z.string().max(255).optional(),
  date: z.string().datetime().optional(),
  categoryId: z.number().int().positive().optional(),
});
