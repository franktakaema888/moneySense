// User Expense Page

const ExpenseSchema = require("../models/expenseModels");

// Add Expense
exports.addExpense = async (req, res) => {
  const { title, amount, category, date, userOwner } = req.body;

  const expense = ExpenseSchema({ title, amount, category, date, userOwner });

  try {
    // Validations
    if (!title || !category || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (!userOwner) {
      return res.status(400).json({ message: "cannot get user id" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
  console.log(expense);
};

// Get the expense
exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete the expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
