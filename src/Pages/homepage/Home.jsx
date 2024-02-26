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
            {UserAuth() && (
              <p>
                Keep Your Thoughts Safe Till LolDays & Whenever! <br /> Worry less! Your thought is safe with us.
              </p>
            )}
            {/* if user is not logged in, diplay welcome APP name */}
            {!UserAuth() && <h2><span className="welcome">Welcome to</span> StroMind.</h2>}
            {!UserAuth() && (
              <p>
                Have you any Thoughts or Ideas you can't disclose to people so as to
                keep it safe?
                <br />
                <b style={{color: "crimson"}}>StroMind</b> is designed to Keep your ideas safe!{" "}
                <br /> Start by signing up if you don't have an account{" "}
                <br /> <b style={{color: "crimson"}}>or</b> <br /> Sign In if you have an account.
              </p>
            )}

            <div className="actionBTN">
              {/* if user is logged in, display my account btn */}
              {UserAuth() && <CtaBtns route="/dashboard" text="My Account" />}
              {/* if user is not logged in, display login and register btn */}
              {!UserAuth() && (
                <>
                  <CtaBtns route="/login" text="Sign In" />
                  <CtaBtns route="/signup" text="Sign Up" />
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
