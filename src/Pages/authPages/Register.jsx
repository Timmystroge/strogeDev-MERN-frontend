import React, { useState } from "react";
import axios from "axios";
import passwordToggler, { Notification } from "./auth.js";
import { HiArrowNarrowRight } from "react-icons/hi";
import "./authPages.css";

const Register = () => {
  // Set User Register Details to an empty js Object
  const [userReg, setUserReg] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  //Set loading state
  const [loading, setLoading] = useState(false);

  // feedback notification
  function notification(msg, action) {
    const notify = document.querySelector(".notification");
    const MSG = document.querySelector(".msg");
    Notification(notify, MSG, msg, action);
    // run this
    //? notification(`You can proceed!`, "show");
  }

  // set values for user registration details
  function handleChange(event) {
    const { name, value } = event.target;
    setUserReg((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); /* set button status to loading */
    const { fullname, email, password } = userReg;

    if (fullname === "") {
      notification(`Please enter your fullname!`, "show");
      setLoading(false); /* set button status to not-loading */
    } else {
      // email validation
      if (!email.includes("@")) {
        notification(`Missing '@', Please Include '@example.com!'`, "show");
        setLoading(false); /* set button status to not-loading */
      } else {
        if (password.length < 6) {
          notification(`Password must be at least 6 chars long!`, "show");
          setLoading(false); /* set button status to not-loading */
        } else {
          //Process Request
          async function newStrogeDevUser() {
            try {
              await axios({
                method: "post",
                url: import.meta.env.VITE_LOCAL_REGISTER_URL_API,
                data: {
                  fullname: fullname,
                  email: email,
                  password: password,
                },
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }).then((data) => {
                console.log(data.status);
                console.log(data.statusText);
                setLoading(false); /* set button status to not-loading */

                // redirect to dashboard
                setTimeout(() => {
                  // window.open("/dashboard", "_self");

                  setUserReg({
                    fullname: "",
                    email: "",
                    password: "",
                  });
                }, 100);
              });
            } catch (error) {
              console.error(error.message);
              setLoading(false); /* set button status to not-loading */
            }
          }
          // request processing ends
          newStrogeDevUser();
        }
      }
    }
  }

  // toggle show and hide password

  function toggle() {
    const toggler = document.querySelector(".show_hide");
    const password = document.querySelector(".passwordInput");
    passwordToggler(password, toggler);
  }
  return (
    <>
      {/* notification */}
      <div className="notification">
        <p className="msg">Notification Message</p>
      </div>
      {/* notification */}

      <section>
        <div className="registerWrapper">
          <h2>Sign Up</h2>
          <form method="POST" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Fullname</label>
              <input
                type="text"
                placeholder="Fullname"
                onChange={handleChange}
                name="fullname"
                autoFocus="on"
                value={userReg.fullname}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={userReg.email}
              />
            </div>

            {/* Password */}
            <div className="form-group password">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="passwordInput"
                onChange={handleChange}
                name="password"
                value={userReg.password}
              />
              <small className="show_hide" onClick={toggle}>
                show
              </small>
            </div>

            {/*  */}
            <p className="haveAnAccount">
              Already have an account?<a href="/login"> Sign In </a>
            </p>

            <div className="form-group">
              <div className="loginBtn">
                {loading ? (
                  <button type="submit">Signing up... </button>
                ) : (
                  <button type="submit">
                    Sign Up <HiArrowNarrowRight />{" "}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
