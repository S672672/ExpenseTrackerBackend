// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const User = require('../models/User'); // Importing Expense model

// Route to add a new expense
router.post('/add', async (req, res) => {
  console.log('data',req.body);
  try {
      // Assuming you're extracting user information from the request (e.g., from authentication middleware)
      const { userId } = req;

      // Create a new expense document
      const newExpense = new Expense({
          ...req.body,// Set createdBy field to the ObjectId of the current user
      });

      // Save the expense to the database
      await newExpense.save();

      res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
  } catch (error) {
      console.error('Error adding expense:', error);
      res.status(500).json({ error: 'Failed to add expense' });
  }
});

router.post("/add-expense", async (req, res) => {
  try {
    const data = req.body;
    console.log(data)
    const newExpense = new Expense({...data});
    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to add expense' });
  }
})

// Route to fetch all expenses
router.get("/get-expenses", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete an expense by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the expense by ID and delete it
    await Expense.findByIdAndDelete(id);

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update an expense by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the expense by ID
    let expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Update the expense with the new data
    expense = Object.assign(expense, updateData);

    // Save the updated expense
    await expense.save();

    res.status(200).json({ message: 'Expense updated successfully', expense });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router to be used in the main application
module.exports = router;
