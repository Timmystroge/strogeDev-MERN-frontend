import React, { useEffect, useState } from "react";
import axios from "axios";
import passwordToggler, { Notification } from "./auth.js";
import { HiArrowNarrowRight } from "react-icons/hi";
import "./authPages.css";
import Input, {
  Button,
  Label,
  NotificationPop,
} from "../components/Elements.jsx";

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
                data: JSON.stringify({
                  fullname: fullname,
                  email: email,
                  password: password,
                }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }).then((data) => {
                if (data.statusText === "OK" || response.status === 200) {
                  if (data.data.msg === "success") {
                    const userID = data.data.userID;
                    sessionStorage.setItem("id", userID);
                    notification(`Account Created Successfully!`, "show");
                    setTimeout(() => {
                      window.open("/dashboard", "_self");
                    }, 1000);

                    setLoading(false);

                    // clear form input
                    setUserReg({
                      fullname: "",
                      email: "",
                      password: "",
                    });
                  } else if (data.data.msg === "emailExist") {
                    notification(`User with this email already exist!`, "show");
                    setLoading(false);
                  }
                } else {
                  // something went wrong
                  notification(
                    `Error creating your account, Try again!`,
                    "show"
                  );
                }
              });
            } catch (error) {
              // console.error(error.message);
              notification(`Something went wrong, ${error.message}!`, "show");
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
      <NotificationPop className="notification" textClass="msg" />
      {/* notification */}

      <section>
        <div className="registerWrapper">
          <h2>Sign Up</h2>
          <form method="POST" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <Label htmlFor="fullname" labelfor="Fullname" />

              <Input
                type="text"
                placeholder="Fullname"
                onChange={handleChange}
                name="fullname"
                autofocus="on"
                value={userReg.fullname}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <Label htmlFor="email" labelfor="Email" />
              <Input
                type="text"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={userReg.email}
              />
            </div>

            {/* Password */}
            <div className="form-group password">
              <Label htmlFor="password" labelfor="Password" />
              <Input
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
                  <Button type="submit" text="Signing up... " />
                ) : (
                  <Button
                    type="submit"
                    text=" Sign Up"
                    icon={<HiArrowNarrowRight />}
                  />
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
