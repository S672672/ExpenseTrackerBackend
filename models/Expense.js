const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expense:String,
    amount:Number,
    expenseType:String,
    date : Date,
    description:String,
    agreeTerms:Boolean,
},{timestamps:true});

const Expense = mongoose.model("expenses",expenseSchema);
module.exports = Expense;