import React from "react";

const Input = ({
  type,
  placeholder,
  onChange,
  name,
  autofocus,
  className,
  value,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        autoFocus={autofocus}
        className={className}
        value={value}
      />
    </>
  );
};

// Label
const Label = ({ htmlfor, labelfor }) => {
  return (
    <>
      <label htmlFor={htmlfor}>{labelfor}</label>
    </>
  );
};

//button
const Button = ({ type, text, icon }) => {
  return (
    <>
      <button type={type}>
        {text}
        {icon}
      </button>
    </>
  );
};

//Notification
const NotificationPop = ({ className, textClass }) => {
  return (
    <>
      <div className={className}>
        <p className={textClass}></p>
      </div>
    </>
  );
};

export default Input;
export { Label, Button, NotificationPop };
