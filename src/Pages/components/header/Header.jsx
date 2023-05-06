import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../homepage/Home";
import Login from "../../authPages/Login";
import Register from "../../authPages/Register";
import NotFound from "../../NotFound.jsx";
import "./header.css";
import Dashboard from "../../dashboard/Dashboard";

// RENDERING STARTS
const header = () => {
  return (
    <>
      <header>
        <div className="container">
          <nav>
            {/* Logo */}
            <div className="logo">
              <h1>
                <a href="/">Stroge-Dev</a>
              </h1>
            </div>

            {/* Nav Links */}
            <div className="navLinks">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/signup">Signup</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default header;
