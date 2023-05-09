import axios from "axios";
import React, { useEffect, useState } from "react";
import UserAuth from "../authPages/UserAuth";
import "./dashboard.css";

const Dashboard = () => {
  // set logged in user Credentials
  const [userCred, setUserCred] = useState({
    fullname: "",
    email: "",
  });

  async function getUser() {
    await axios({
      method: "post",
      url: import.meta.env.VITE_LOCAL_DASHBOARD_URL_API,
      data: JSON.stringify({
        userID: sessionStorage.getItem("id"),
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }).then(function (data) {
      const { fullname, email } = data.data.user;
      setUserCred({
        fullname: fullname,
        email: email,
      });
    });
  }
  return (
    <>
      {UserAuth() ? (
        <section>
          <div className="dashboard">
            <h1>Dashboard</h1>
            <p>
              Welcome user {UserAuth() && userCred.fullname},{" "}
              {UserAuth() && userCred.email}
            </p>
          </div>
        </section>
      ) : (
        window.open("/", "_self")
      )}
    </>
  );
};

export default Dashboard;
