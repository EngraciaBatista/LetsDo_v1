import React, { useState, useEffect } from "react";
import "./Task.css";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { useNavigate } from "react-router-dom";

function TaskManager() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const navigate = useNavigate();

  async function storeTasks() {
    const tasks = await getTasks();
    setTaskList(tasks);
  }
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/");
      return;
    }
    storeTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTask = async () => {
    if (task.trim() !== "") {
      try {
        const newTask = {
          userId: localStorage.getItem("userId"),
          title: task,
          status: false,
          category: "General",
          priority: "Medium",
        };
        console.log(newTask);
        const addedTask = await createTask(newTask);
        setTaskList([...taskList, addedTask]);
        setTask("");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleEditTask = (id, currentTaskTitle) => {
    setTask(currentTaskTitle);
    setIsEditing(true);
    setCurrentTaskId(id);
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = { title: task };
      await updateTask(currentTaskId, updatedTask);
      const tasks = await getTasks();
      setTaskList(tasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      await storeTasks();
      console.log(taskList);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="task-manager">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {isEditing ? (
          <button className="update-button" onClick={handleUpdateTask}>
            Update
          </button>
        ) : (
          <button className="add-button" onClick={handleAddTask} type="submit">
            Add
          </button>
        )}
      </div>
      <div className="task-container">
        {taskList.length > 0 ? (
          <ul>
            {taskList.map(({ _id, title }) => (
              <li key={_id}>
                <span>{title}</span>
                <button
                  className="edit-button"
                  onClick={() => handleEditTask(_id, title)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTask(_id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default TaskManager;
