import React from "react";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <>
      <section className="notfound">
        <div className="container">
          <div className="errorIcon">
            <TbError404  />
          </div>
          <h2>Ooops! You seem lost, Aren't you?</h2>
          <p>
            Go back <a href="/">Home.</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default NotFound;
