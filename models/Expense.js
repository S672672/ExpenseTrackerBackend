const mongoose = require('mongoose');

// Define the schema for expenses
const expenseSchema = new mongoose.Schema({
    expense: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    bill: {
      type: Buffer, // Changed to store file data directly
      contentType: String // MIME type of the file
    },
    expenseType: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    agreeTerms: {
      type: Boolean,
      required: true
    }
  });
  

// Create a model for expenses using the expenseSchema
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
