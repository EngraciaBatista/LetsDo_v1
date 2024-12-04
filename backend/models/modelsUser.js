const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
    required: true,
  },
  completed: { type: Number },
  picture: { type: String },
  created: {
    type: Date,
    default: Date.now,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  //I removed the salt since it defeats the purpose when stored in the database it should be in the .env file and doesn't need to change per user
});

const User = mongoose.model("User", userSchema);

module.exports = User;
