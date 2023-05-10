import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../homepage/Home";
import Login from "../../authPages/Login";
import Register from "../../authPages/Register";
import NotFound from "../../NotFound.jsx";
import "./header.css";
import Dashboard from "../../dashboard/Dashboard";
import UserAuth from "../../authPages/UserAuth";

// RENDERING STARTS
const header = () => {
  function logOut() {
    sessionStorage.clear();
    window.open("/", "_self");
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            {/* Logo */}
            <div className="logo">
              <h1>
                <a href="/">StroMind.</a>
              </h1>
            </div>

            {/* Nav Links */}
            <div className="navLinks">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                {/* if user is logged in show logOut btn */}
                {UserAuth() && (
                  <li>
                    <a href="/dashboard">My Account</a>
                  </li>
                )}
                {UserAuth() && (
                  <li>
                    <a href="#" onClick={logOut}>
                      Logout
                    </a>
                  </li>
                )}

                {/* show login/signup is user is not logged in */}
                {!UserAuth() && (
                  <li>
                    <a href="/login">Sign In</a>
                  </li>
                )}
                
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default header;
