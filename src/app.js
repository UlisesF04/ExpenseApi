import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
