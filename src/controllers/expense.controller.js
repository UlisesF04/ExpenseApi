import * as expenseService from "../services/expense.service.js";

export const getAll = async (req, res) => {
  try {
    const result = await expenseService.getAll(req.user.id, req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const expense = await expenseService.getById(
      parseInt(req.params.id),
      req.user.id,
    );
    res.json(expense);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const expense = await expenseService.create(req.user.id, req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const expense = await expenseService.update(
      parseInt(req.params.id),
      req.user.id,
      req.body,
    );
    res.json(expense);
  } catch (error) {
    const status = error.message === "Expense not found" ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await expenseService.remove(parseInt(req.params.id), req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    const summary = await expenseService.getSummary(req.user.id, req.query);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await expenseService.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
