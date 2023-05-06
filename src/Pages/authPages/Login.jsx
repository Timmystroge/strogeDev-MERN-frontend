import React from "react";
import "./authPages.css";

const Login = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="loginWrapper">
            <h2>Sign In</h2>
            <form action="" method="POST">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Email" />
              </div>
              {/* Password */}
              <div className="form-group password">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" />
                <small className="show_hide">show</small>
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
