import React from "react";

const NotFound = () => {
  return (
    <>
      <section className="notfound">
        <div className="container">
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
