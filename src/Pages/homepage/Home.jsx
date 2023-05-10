import React from "react";
import CtaBtns from "../components/CtaBtns";
import "./home.css";
import UserAuth from "../authPages/UserAuth";

const Home = () => {
  return (
    <>
      <main>
        <div className="container">
          <div className="homeContent">
            {/* if user is logged in, diplay APP name */}
            {UserAuth() && <h2>StroMind.</h2>}
            {/* if user is not logged in, diplay welcome APP name */}
            {!UserAuth() && <h2>Welcome to StroMind.</h2>}
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laudantium nemo sit possimus harum.
            </p>

            <div className="actionBTN">
              {/* if user is logged in, display my account btn */}
              {UserAuth() && <CtaBtns route="/dashboard" text="My Account" />}
              {/* if user is not logged in, display login and register btn */}
              {!UserAuth() && (
                <>
                  <CtaBtns route="/login" text="Login" />
                  <CtaBtns route="/signup" text="Signup" />{" "}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
