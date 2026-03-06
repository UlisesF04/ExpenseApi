import { Router } from "express";
import * as expenseController from "../controllers/expense.controller.js";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "../schemas/expense.schema.js";

const router = Router();

router.use(auth);

router.get("/", expenseController.getAll);
router.get("/summary", expenseController.getSummary);
router.get("/categories", expenseController.getCategories);
router.get("/:id", expenseController.getById);
router.post("/", validate(createExpenseSchema), expenseController.create);
router.put("/:id", validate(updateExpenseSchema), expenseController.update);
router.delete("/:id", expenseController.remove);

export default router;
