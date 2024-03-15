/** Server Management */
// Express - framework to create our API
const express = require("express");
// Cors to set-up the rules of communication between the frontend and backend else 
//we can't make an API request from react application
const cors = require("cors");
// For mongodb
const { db } = require("./db/db");
// Reads information in a specified directory
const { readdirSync } = require("fs");

const app = express();

//allows us to manage .env file
require("dotenv").config();

const PORT = process.env.PORT;

// Middleswares
app.use(express.json());
app.use(cors()); // Used to access the server

// addtional code from the video. not sure what it does yet
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// Routes
const userAuthentic = require("./routes/userpage");
const userNotAuthentic = require("./routes/mainpage");
const apiExtension = require("./routes/apipage"); //api json page extension

app.use("/auth", userAuthentic);
app.use("/main", userNotAuthentic);
app.use("/api", apiExtension); //api json page extension

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
