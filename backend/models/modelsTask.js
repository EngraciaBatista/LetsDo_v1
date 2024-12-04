const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  status: { type: Boolean, default: false },
  category: { type: String },
  date: { type: Date, default: Date.now },
  priority: { type: String, enum: ["High", "Medium", "Low"] },
});

module.exports = mongoose.model("Task", taskSchema);
