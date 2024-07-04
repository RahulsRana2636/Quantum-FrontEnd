import './App.css';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginStatus = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
  <BrowserRouter>
    <Header handleLogout={handleLogout} 
    />
  <Routes>
  <Route path="/" element={<Signup />} />
  <Route path="/login" element={<Login isLoggedIn={isLoggedIn} handleLoginStatus={handleLoginStatus}/>} />
  <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
