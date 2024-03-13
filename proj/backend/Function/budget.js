//budget funcitons

const UsersModels = require("../models/UsersModels");

//get budget function
exports.getBudget = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the user by user_id and select only the budget field
    const user = await UsersModels.findById(id).select("budget");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user.budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//update budget function
exports.updateBudget = async (req, res) => {
  const { id, budget } = req.body;

  try {
    // Validation
    if (!id || !budget) {
      return res
        .status(402)
        .json({ message: "Please provide a valid id and budget." });
    }

    if (budget <= 0) {
      return res
        .status(401)
        .json({ message: "Budget must be a positive number." });
    }

    // Check if the user exists
    const user = await UsersModels.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the budget
    user.budget = budget;
    await user.save();

    res.status(200).json({ message: "Budget updated successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
