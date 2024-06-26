const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expenseTitle: String,
    expenseAmount: String,
    expenseType: String,
    expenseDate: Date,
    description: String,
    agreeTerms: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
