import React, { useState } from "react";
const { log } = console;
import passwordToggler, { Notification } from "./auth.js";
import "./authPages.css";

const Login = () => {
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
    event.preventDefault();
    const { email, password } = userLogin;
    // email validation
    if (!email.includes("@")) {
      notification(`Missing '@', Please Include '@example.com!'`, "show");
    } else {
      if (password.length < 6) {
        notification(`Password must be at least 6 chars long!`, "show");
      } else {
        notification(`You can proceed!`, "show");
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
                  <button type="submit">Login</button>
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

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// axios.post('/user', {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });

// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });

// axios({
//   method: 'get',
//   url: 'https://',
//   responseType: 'stream'
// })
//   .then(function (response) {
//     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//   });
