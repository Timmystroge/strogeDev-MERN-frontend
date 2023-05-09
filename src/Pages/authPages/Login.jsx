import axios from "axios";
import React, { useState } from "react";
import passwordToggler, { Notification } from "./auth.js";
import { HiArrowNarrowRight } from "react-icons/hi";
import "./authPages.css";
const { log } = console;

const Login = () => {
  //Set loading state
  const [loading, setLoading] = useState(false);

  // Set User Login Details to an empty js Object
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // feedback notification
  function notification(msg, action) {
    const notify = document.querySelector(".notification");
    const MSG = document.querySelector(".msg");
    Notification(notify, MSG, msg, action);
    // run this
    //? notification(`You can proceed!`, "show");
  }

  // set values for userlogin
  function handleChange(event) {
    const { name, value } = event.target;
    setUserLogin((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  // handle data when form is submitted
  function handleSubmit(event) {
    setLoading(true); /* set button status to loading */
    event.preventDefault();

    const { email, password } = userLogin;
    // email validation
    if (!email.includes("@")) {
      notification(`Missing '@', Please Include '@example.com!'`, "show");
      setLoading(false);
    } else {
      if (password.length < 6) {
        notification(`Password must be at least 6 chars long!`, "show");
        setLoading(false);
      } else {
        async function login() {
          try {
            await axios({
              method: "post",
              url: process.env.VITE_LOCAL_LOGIN_URL_API,
              data: JSON.stringify({
                email: email,
                password: password,
              }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
              },
            }).then((data) => {
              console.log(data.data.msg);
              if (data.statusText === "OK" || response.status === 200) {
                if (data.data.msg === "success") {
                  const userID = data.data.userID; /* Get userid */

                  sessionStorage.setItem(
                    "id",
                    userID
                  ); /* Save userid to session */

                  notification(`Login Successful!`, "show"); /* notify user */
                  setTimeout(() => {
                    window.open("/dashboard", "_self");
                  }, 100);

                  setLoading(false);

                  // clear form input
                  setUserLogin({
                    email: "",
                    password: "",
                  });
                } else if (data.data.msg === "userNotExist") {
                  notification(
                    `Account not found, Please create and account!`,
                    "show"
                  ); /* notify user */
                  setLoading(false);
                } else if (data.data.msg === "passwordNotMatch") {
                  notification(`Incorrect password!`, "show"); /* notify user */
                  setLoading(false);
                }
              } else {
                // something went wrong
                notification(`Error creating your account, Try again!`, "show");
                setLoading(false);
              }
            });
          } catch (error) {
            // console.error(error.message);
            notification(`Something went wrong, ${error.message}!`, "show");
            setLoading(false); /* set button status to not-loading */
          }
        }
        login();
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
        <div className="container">
          <div className="loginWrapper">
            <h2>Sign In</h2>
            <form action="" method="POST" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  autoFocus="on"
                />
              </div>
              {/* Password */}
              <div className="form-group password">
                <label htmlFor="password">Password</label>
                <input
                  className="passwordInput"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                />
                <small className="show_hide" onClick={toggle}>
                  show
                </small>
              </div>

              {/*  */}
              <p className="haveAnAccount">
                Don't have an account?<a href="/signup"> Sign Up</a>
              </p>
              <p className="haveAnAccount">
                Forgotten password?<a href="/signup"> Recover</a>
              </p>

              <div className="form-group">
                <div className="loginBtn">
                  {loading ? (
                    <button type="submit">Logging in...</button>
                  ) : (
                    <button type="submit">
                      Login <HiArrowNarrowRight />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

// axios({
//   method: 'get',
//   url: 'https://',
//   responseType: 'stream'
// })
//   .then(function (response) {
//     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//   });
