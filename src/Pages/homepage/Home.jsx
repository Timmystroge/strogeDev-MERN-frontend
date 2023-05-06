import React from "react";
import CtaBtns from "../components/CtaBtns";
import "./home.css";

const Home = () => {
  return (
    <>
      <main>
        <div className="container">
          <div className="homeContent">
            <h2>Welcome to Stroge-Dev</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laudantium nemo sit possimus harum.
            </p>

            <div className="actionBTN">
              <CtaBtns route="/login" text="Login" /> {/* Login */}
              <CtaBtns route="/signup" text="Signup" /> {/* Register */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
