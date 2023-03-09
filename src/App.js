import "./App.css";
import Footer from "./components/footer";
import Login from "./components/loging";
import Sidebar from "./components/sidebar";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Dashboard from "./components/routes/dashboard";
import {
  Partners,
  createPartner,
  loadPartners,
  deletePartner,
} from "./components/routes/partners";
import Users from "./components/routes/users";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  // Check if the current route path is the login page
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && isLoggedIn && <Sidebar isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/partners/createPartner" element={createPartner} />
        <Route path="/partners/loadPartners" exact component={loadPartners} />
        <Route path="/partners/deletePartner" exact component={deletePartner} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/addUser" exact component={Users} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
