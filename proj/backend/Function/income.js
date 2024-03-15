// User Income page 
const IncomeSchema = require("../models/incomeModels");

// Add income
exports.addIncome = async (req, res) => {
  const { title, amount, category, date, userOwner } = req.body;

  const income = IncomeSchema({ title, amount, category, date, userOwner });

  try {
    // Validations
    if (!title || !category || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    //save after the validation
    await income.save();
    res.status(200).json({ message: "Income Added" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
  console.log(income);
};


// Get the income
exports.getIncomes = async (req, res) => {

  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// Delete income
exports.deleteIncome = async (req, res) => {

  const { id } = req.params;

  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server Error" });
    });
};
