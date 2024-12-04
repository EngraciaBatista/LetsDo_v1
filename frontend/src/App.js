import React from 'react';
import './App.css';
import Footer from './shared/Footer';
import TaskManager from './tasks/Task';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <img src="/letsdologo_header.png" alt="Logo" className="logo" />
        <h2>Task Manager</h2>
        <p>Welcome to LetsDo, your personal task manager.</p>
        {/* Task Manager Component */}
        <TaskManager />
        <Footer />
      </div>
    </div>
  );
}

export default App;