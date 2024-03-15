/** User registration and login functions */

const UsersModels = require("../models/UsersModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register function
exports.register = async (req, res) => {
  const { username, password } = req.body;

  // make request to UsersModels to find the first user that matches the username in the req.body from the front-end
  const user = await UsersModels.findOne({ username });

  //check if the user in the database
  if (user) {
    return res.status(500).json({ message: "User already exsist!" });
  }
  console.log("password: ", password)
  //using bcrypt to hash the user passwords
  const hashedpassword = await bcrypt.hash(password, 10);

  // create new user with defined fields with password in hashed form and add it into MongoDB

  const newUser = new UsersModels({
    username,
    password: hashedpassword,
    budget: 0,
  });
  res.json({ message: "User Registered Successfully: " });
  //to make the changes in MongoDB
  await newUser.save();
};

//login function
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // make request to UsersModels to find the first user that matches the username in the req.body from the front-end
  const user = await UsersModels.findOne({ username });

  //check if the user match is found in the database
  if (!user) {
    return res.json({ message: "User Doesn't Exist" });
  }

  // encrypt entered password to compare it to the hashed one in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  //check if the password we entered matches the one in the database
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password Is Incorrect!" });
  }

  //create token using json web tokens
  const token = jwt.sign(
    {
      id: user._id,
    },
    "secret"
  );

  // sends back created token and userID
  res.json({ token, userID: user._id });
};
