//all the funcionality after login the application

const router = require('express').Router();

const { addIncome, getIncomes, deleteIncome} = require('../Function/income');
const { addExpense, getExpense, deleteExpense} = require('../Function/expense');
const {updateBudget, getBudget} = require('../Function/budget');

// Default
router.get('/',(req, res)=>{
    res.send("hello world")
})


router
    // Income
      .post('/add-income', addIncome)
      .get('/get-incomes', getIncomes)
      .delete('/delete-income/:id', deleteIncome)
      
    // Expense 
      .post('/add-expense', addExpense)
      .get('/get-expenses', getExpense)
      .delete('/delete-expense/:id', deleteExpense)

    // Budget
      .get('/get-budget/:id', getBudget)
      .post('/budget', updateBudget)

module.exports = router

