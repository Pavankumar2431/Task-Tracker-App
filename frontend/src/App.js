import React, { useState, useEffect } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/Login'; // Login Component
import TaskTracker from './components/TaskTracker'; // TaskTracker Component
import Signup from './components/Signup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route
        path="/tasks"
        element={
          isLoggedIn ? (
            <TaskTracker onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/tasks" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
       <Route
        path="/signup"
        element={
          isLoggedIn ? (
            <Navigate to="/tasks" replace />
          ) : (
            <Signup onLogin={handleLogin} />
          )
        }
      />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/tasks" : "/login"} />} />
    </Routes>
  );
};

export default App;
