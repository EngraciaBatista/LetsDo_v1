const User = require("../models/modelsUser");
const bcrypt = require("bcrypt");

//I removed next since it is used when create a middleware there is no need for it here in controllers

const createUser = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth } = req.body;

  const hashed_password = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    dateOfBirth,
    hashed_password,
  });

  try {
    await newUser.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  return res.status(200).json({ user: newUser });
};

const displayUsers = async (req, res) => {
  let users;

  try {
    users = await User.find({}, "+hashed_password");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve users, please try again later." });
  }

  res.status(200).json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;

  console.log("ian");
  try {
    existingUser = await User.findOne({ email });
    console.log(email, password, existingUser);
  } catch (err) {
    return res.status(500).json({ message: "Login Failed." });
  }

  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "User does not exist. Please create an account." });
  }

  if (!bcrypt.compareSync(password, existingUser.hashed_password)) {
    return res
      .status(400)
      .json({ message: "Invalid password. Please try again." });
  }
  return res.status(200).json({
    message: "Successfully logged in!",
    userID: existingUser.id,
  });
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (e) {
    return res.status(500).json({ message: "There was a server error" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "There is no such user" });
  }
  return res.send(true);
};

module.exports = {
  createUser,
  displayUsers,
  loginUser,
  getUser,
};
