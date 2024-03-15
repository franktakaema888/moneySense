// An ARM for MongoDB (Database Management System)
// Allows us to right queries and communications to database

const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Connection Error");
    console.log("error:" + error);
  }
};

module.exports = { db };