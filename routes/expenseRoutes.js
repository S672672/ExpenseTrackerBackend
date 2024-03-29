const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Route to add a new expense
router.post('/add', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all expenses
router.get('/get', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get a specific expense by ID
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to update an existing expense by ID
router.patch('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to delete an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
