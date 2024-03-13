//express - framework to create our API
const express = require("express");

//cors to set-up the rules of communication between the frontend and backend else we can't make an API request from react application
const cors = require("cors");

//for mongodb
const { db } = require("./db/db");

//node.js file system The fs.
//readdirSync() method is used to synchronously read the contents of a given directory.
//The method returns an array with all the file names or objects in the directory.
//The options argument can be used to change the format in which the files are returned from the method.
const { readdirSync } = require("fs");

const app = express();

//allows us to manage .env file
require("dotenv").config();
const PORT = process.env.PORT;
//allows us to except data in json format
app.use(express.json());
app.use(cors());

//routes
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
