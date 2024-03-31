// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Route to add a new expense
router.post('/add', async (req, res) => {
  try {
    const { expense, amount,expenseType,date, description,agreeTerms } = req.body;

    // Create a new expense document
    const newExpense = new Expense({
      expense,
      amount,
      expenseType,
      date,
      description,
      agreeTerms,
    });

    // Save the expense to the database
    await newExpense.save();

    // Send a success response
    res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Route to fetch all expenses
router.get('/all', async (req, res) => {
  try {
    // Fetch all expenses from the database
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Export the router to be used in the main application
module.exports = router;
