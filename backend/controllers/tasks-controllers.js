const Task = require("../models/modelsTask");
const HttpError = require("../models/modelsHttpError.js");

const displayAllTasks = async (req, res, next) => {
  let tasks;

  try {
    tasks = await Task.find();
  } catch (err) {
    const error = new HttpError("Unable to retrieve tasks, please try again later.", 500);   
    return next(error);
  }

  return res.status(200).json({
    tasks: tasks.map((task) => task.toObject({ getters: true })),
  });
};
const displayUserTasks = async (req, res, next) => {
  const { userId } = req.params;
  let tasks;

  try {
    tasks = await Task.find({ userId });
  } catch (err) {
    const error = new HttpError("Unable to retrieve tasks, please try again later.", 500);   
    return next(error);
  }

  return res.status(200).json({
    tasks: tasks.map((task) => task.toObject({ getters: true })),
  });
};

const createTask = async (req, res, next) => {
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
    const error = new HttpError("Unable to create a new task, please try again later.", 500);   
    return next(error)
  }

  return res.status(200).json({ task: newTask });
};

const editTask = async (req, res, next) => {
  const { title, category, priority } = req.body;
  const taskID = req.params.taskID;
  let task;

  try {
    task = await Task.findById(taskID);
  } catch (err) {
    const error = new HttpError("A problem occurred. Task could not be edited.", 500);   
    return next(error)
  }

  if (!task) {
    const error = new HttpError("Task not found.", 404);   
    return next(error)
  }

  task.title = title;
  task.category = category;
  task.priority = priority;

  try {
    await task.save();
  } catch (err) {
    const error = new HttpError("A problem occurred. Task could not be edited.", 500);   
    return next(error)
  }
  return res.status(200).json({
    message: "Task updated successfully!",
    task: task.toObject({ getters: true }),
  });
};

const deleteTask = async (req, res, next) => {
  const taskID = req.params.taskID;
  let task;

  try {
    task = await Task.findById(taskID);
  } catch (err) {
    const error = new HttpError("A problem occurred. Task could not be deleted.", 500);   
    return next(error)
  }

  if (!task) {
    const error = new HttpError("This task could not be found.", 404);   
    return next(error)
  }

  try {
    await Task.deleteOne({ _id: taskID });
  } catch (err) {
    const error = new HttpError("A problem occurred. Task could not be deleted.", 500);   
    return next(error)
  }

  res.status(200).json({ message: "Task deleted." });
};

const displayTasksByCategory = async (req, res, next) => {
  const { category } = req.params;
  try {
    tasks = await Task.find({ category: category });
  } catch (err) {
    const error = new HttpError("Unable to retrieve tasks. Please try again later.", 500);   
    return next(error)
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
