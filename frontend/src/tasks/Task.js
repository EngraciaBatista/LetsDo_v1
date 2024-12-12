import React, { useState, useEffect } from "react";
import "./Task.css";
import Footer from '../shared/Footer';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { useNavigate } from "react-router-dom";

function TaskManager() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState('Medium');
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
          category: category,
          priority: priority,
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

  const handleUpdateTask = async () => {
    try {
      const updatedTask = { title: task };
      await updateTask(currentTaskId, updatedTask);
      const tasks = await getTasks();
      setTaskList(tasks);
      resetForm();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const resetForm = () => {
    setTask('');
    setCategory('Personal');
    setPriority('Medium');
    setIsEditing(false);
    setCurrentTaskId(null);
  };

  const handleDeleteTask = async (id) => {
    try {
        await deleteTask(id);
        setTaskList((prevTasks) => prevTasks.filter(task => task._id !== id));
    } catch (error) {
        console.error("Error deleting task:", error);
    }
  };


  return (
    <div className="App">
      <div className="app-container">
        <img src="/letsdologo_header.png" alt="Logo" className="logo" />
        <h2>Task Manager</h2>
        <p>Welcome to LetsDo, your personal task manager.</p>
        <div className="task-manager">
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Personal">Personal</option>
              <option value="Studies">Studies</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {isEditing ? (
              <button className="update-button" onClick={handleUpdateTask}>
                Update
              </button>
            ) : (
              <button className="add-button" onClick={handleAddTask}>
                Add
              </button>
            )}
          </div>
          <div className="task-container">
            {taskList.length > 0 ? (
              <ul>
                {taskList.map(({ _id, title, category, priority }) => (
                  <li key={_id}>
                    <span>
                      {title} - <b>{category}</b> - <i>{priority}</i>
                    </span>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setTask(title);
                        setCategory(category);
                        setPriority(priority);
                        setIsEditing(true);
                        setCurrentTaskId(_id);
                      }}
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
        <Footer />
      </div>
    </div>
  );
}

export default TaskManager;
