const express = require("express");
const tasksControllers = require("../controllers/tasks-controllers");

const router = express.Router();

router.post("/create", tasksControllers.createTask);

router.put("/:taskID", tasksControllers.editTask);

router.delete("/:taskID", tasksControllers.deleteTask);

router.get("/", tasksControllers.displayAllTasks);

router.get("/user/:userId", tasksControllers.displayUserTasks);

router.get("/category/:category", tasksControllers.displayTasksByCategory);

module.exports = router;
