//Hey team, this page is what I have used to Route the landing to the tasks page. 
//I had to make the render a case switch that starts on landing and ends on tasks page.
//After which, I worked on the functionality of log ins and signups taking users directly to the tasks page. -Benjamin Serwadda
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './LandingPage';
import TaskManager from './tasks/Task';
//import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Router>
    <Routes>
     <Route path="/" element={<Landing />}/>
     <Route path="/tasks" element={<TaskManager/>}/>
    {/*<App />*/}
    </Routes>
  </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
