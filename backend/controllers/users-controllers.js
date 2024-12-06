const User = require("../models/modelsUser");
const HttpError = require("../models/modelsHttpError");
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

const displayUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "+hashed_password");
  } catch (err) {
    const error = new HttpError("Unable to retrieve users. Please try again later.", 500);   
    return next(error)
  }

  res.status(200).json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  console.log("ian");
  try {
    existingUser = await User.findOne({ email });
    console.log(email, password, existingUser);
  } catch (err) {
    const error = new HttpError("Login failed.", 500);   
    return next(error)
  }

  if (!existingUser) {
    const error = new HttpError("User does not exist. Please create an account.", 400);   
    return next(error)
  }

  if (!bcrypt.compareSync(password, existingUser.hashed_password)) {
    const error = new HttpError("Invalid password. Please try again.", 400);   
    return next(error)
  }
  return res.status(200).json({
    message: "Successfully logged in!",
    userID: existingUser.id,
  });
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;

  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (e) {
    const error = new HttpError("Sever error. Try again later.", 500);   
    return next(error)
  }

  if (!existingUser) {
    const error = new HttpError("User does not exist.", 500);   
    return next(error)
  }
  return res.send(true);
};

module.exports = {
  createUser,
  displayUsers,
  loginUser,
  getUser,
};
