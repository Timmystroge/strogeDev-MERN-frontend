import React from "react";
import "./footer.css"

const Footer = () => {
  return (
    <footer>
      <div className="container">
      <p>Copyright &copy; {new Date().getFullYear()} Timmystroge</p>
      </div>
    </footer>
  );
};

export default Footer;
