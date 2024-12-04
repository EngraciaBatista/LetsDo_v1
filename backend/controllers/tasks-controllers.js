const Task = require("../models/modelsTask");

const displayAllTasks = async (req, res) => {
  let tasks;

  try {
    tasks = await Task.find();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve tasks, please try again later." });
  }

  return res.status(200).json({
    tasks: tasks.map((task) => task.toObject({ getters: true })),
  });
};
const displayUserTasks = async (req, res) => {
  const { userId } = req.params;
  let tasks;

  try {
    tasks = await Task.find({ userId });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve tasks, please try again later." });
  }

  return res.status(200).json({
    tasks: tasks.map((task) => task.toObject({ getters: true })),
  });
};

const createTask = async (req, res) => {
  const { title, category, priority, userId } = req.body;

  const newTask = new Task({
    title,
    userId,
    category,
    priority,
  });

  try {
    await newTask.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to create a new task, please try again." });
  }

  return res.status(200).json({ task: newTask });
};

const editTask = async (req, res) => {
  const { title, category, priority } = req.body;
  const taskID = req.params.taskID;
  let task;

  try {
    task = await Task.findById(taskID);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "A problem occurred. Task could not be edited." });
  }

  if (!task) {
    return res.status(404).json({ message: "Task not found." });
  }

  task.title = title;
  task.category = category;
  task.priority = priority;

  try {
    await task.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "A problem occurred. Task could not be edited." });
  }
  return res.status(200).json({
    message: "Task updated successfully!",
    task: task.toObject({ getters: true }),
  });
};

const deleteTask = async (req, res) => {
  const taskID = req.params.taskID;
  let task;

  try {
    task = await Task.findById(taskID);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "A problem occurred. Task cannot be deleted. " });
  }

  if (!task) {
    return res.status(404).json({ message: "This task could not be found." });
  }

  try {
    await Task.deleteOne();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "A problem occurred. Task cannot be deleted." });
  }

  res.status(200).json({ message: "Task deleted." });
};

const displayTasksByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    tasks = await Task.find({ category: category });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve tasks, please try again later." });
  }

  res.status(200).json({
    tasks: tasks.map((task) => task.toObject({ getters: true })),
  });
};

module.exports = {
  displayAllTasks,
  displayUserTasks,
  deleteTask,
  displayTasksByCategory,
  createTask,
  editTask,
};
