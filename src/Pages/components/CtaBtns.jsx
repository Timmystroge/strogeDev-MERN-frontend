import React from "react";

const CtaBtns = ({ route, text }) => {
  return (
    <a href={route}>
      <button>{text}</button>
    </a>
  );
};

export default CtaBtns;
