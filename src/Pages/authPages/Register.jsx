import React from "react";
import "./authPages.css";

const Register = () => {
  return (
    <>
      <section>
        <div className="registerWrapper">
          <h2>Sign Up</h2>
          <form action="" method="POST">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Fullname</label>
              <input type="text" placeholder="Fullname" />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="Email" />
            </div>

            {/* Password */}
            <div className="form-group password">
              <label htmlFor="email">Password</label>
              <input type="password" placeholder="Password" />
              <small className="show_hide">show</small>
            </div>

            {/*  */}
            <p className="haveAnAccount">
              Already have an account?<a href="/login"> Sign In</a>
            </p>

            <div className="form-group">
              <div className="loginBtn">
                <button type="submit">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
