import prisma from "../config/prisma.js";

export const getAll = async (
  userId,
  { categoryId, month, year, page = 1, limit = 10 },
) => {
  const where = { userId };

  if (categoryId) {
    where.categoryId = parseInt(categoryId);
  }

  if (month && year) {
    const from = new Date(year, month - 1, 1);
    const to = new Date(year, month, 1);
    where.date = { gte: from, lt: to };
  }

  const skip = (page - 1) * limit;
  const total = await prisma.expense.count({ where });

  const expenses = await prisma.expense.findMany({
    where,
    skip,
    take: parseInt(limit),
    orderBy: { date: "desc" },
    include: { category: true },
  });

  return {
    data: expenses,
    meta: {
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getById = async (id, userId) => {
  const expense = await prisma.expense.findFirst({
    where: { id, userId },
    include: { category: true },
  });

  if (!expense) throw new Error("Expense not found");
  return expense;
};

export const create = async (userId, data) => {
  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
  });
  if (!category) throw new Error("Category not found");

  return prisma.expense.create({
    data: {
      ...data,
      userId,
      date: data.date ? new Date(data.date) : new Date(),
    },
    include: { category: true },
  });
};

export const update = async (id, userId, data) => {
  await getById(id, userId);

  if (data.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) throw new Error("Category not found");
  }

  return prisma.expense.update({
    where: { id },
    data: { ...data, date: data.date ? new Date(data.date) : undefined },
    include: { category: true },
  });
};

export const remove = async (id, userId) => {
  await getById(id, userId);
  await prisma.expense.delete({ where: { id } });
};

export const getSummary = async (userId, { month, year }) => {
  const where = { userId };

  if (month && year) {
    const from = new Date(year, month - 1, 1);
    const to = new Date(year, month, 1);
    where.date = { gte: from, lt: to };
  }

  const expenses = await prisma.expense.findMany({
    where,
    include: { category: true },
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const byCategory = expenses.reduce((acc, e) => {
    const name = e.category.name;
    acc[name] = (acc[name] || 0) + e.amount;
    return acc;
  }, {});

  const byMonth = expenses.reduce((acc, e) => {
    const key = `${e.date.getFullYear()}-${String(e.date.getMonth() + 1).padStart(2, "0")}`;
    acc[key] = (acc[key] || 0) + e.amount;
    return acc;
  }, {});

  return {
    total: parseFloat(total.toFixed(2)),
    byCategory: Object.entries(byCategory).map(([category, amount]) => ({
      category,
      amount: parseFloat(amount.toFixed(2)),
    })),
    byMonth: Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({
        month,
        amount: parseFloat(amount.toFixed(2)),
      })),
  };
};

export const getCategories = async () => {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
};
