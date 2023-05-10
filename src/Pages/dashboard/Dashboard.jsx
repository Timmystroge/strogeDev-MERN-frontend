import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import UserAuth from "../authPages/UserAuth";
import { Notification } from "../authPages/auth.js";
import "./dashboard.css";
import { Button, NotificationPop } from "../components/Elements";

const Dashboard = () => {
  //! set logged in user Credentials
  const [userCred, setUserCred] = useState({
    fullname: "",
    email: "",
  });

  //! set new created thoughts, /* New thoughts created by user */
  const [Thought, setThought] = useState("");

  //! set new write, this will handle the expansion of the textarea when clicked
  const [write, setWrite] = useState(false);

  //! set user thoughts /* all user thought */
  const [userThoughts, setUserThoughts] = useState([]);

  //! set user thoughts /* all user thought */
  const [saveThought, setSaveThought] = useState(false);

  //! make an asynchronous request to backend endpoint to fetch user data
  async function getUser() {
    await axios({
      method: "post",
      url: import.meta.env.VITE_DASHBOARD_URL_API,
      data: JSON.stringify({
        userID: sessionStorage.getItem("id"),
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }).then(function (data) {
      if (data.data.user !== undefined) {
        const { fullname, email } = data.data.user;
        setUserCred({
          fullname: fullname,
          email: email,
        });
      } else {
        sessionStorage.clear();
        window.open("/", "_self");
      }
    });
  }

  //! make an asynchronous request to backend endpoint to fetch user thought
  async function getUserThoughts() {
    await axios({
      method: "post",
      url: import.meta.env.VITE_DATA_URL_API,
      data: JSON.stringify({
        userID: sessionStorage.getItem("id"),
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }).then(function (data) {
      if (data.status === 200 || data.statusText === "OK") {
        if (data.data.msg === "success" && data.data.status === "noData") {
        } else if (data.data.msg === "success" && data.data.status === "data") {
          setUserThoughts((prevThoughts) => {
            return [...prevThoughts, data.data.userData];
          }); /* add fetched userThought to thoughts array  */
        }
      }
    });
  }

  //! handle submit request
  function handleSubmit(e) {
    e.preventDefault();

    // set setSaveThought to true, to show user app is processing their request
    setSaveThought(true);
    //
    if (Thought === "") {
      notification(
        "Paddy, You wan submit empty thought? LMAO 😂 ",
        "show",
        "3000"
      );
    } else {
      //! make an asynchronous request to backend endpoint to submit user thought
      async function createNewThought() {
        await axios({
          method: "post",
          url: import.meta.env.VITE_CREATE_URL_API,
          data: JSON.stringify({
            id: sessionStorage.getItem("id"),
            thought: Thought,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }).then(function (data) {
          if (data.status === 200 || data.statusText === "OK") {
            if (data.data.msg === "saved") {
              notification("New thought added!", "show", "3000");
              setThought("");
              setTimeout(() => [window.open("/dashboard", "_self")], 500);

              // set setSaveThought to false.
              setSaveThought(false);
            }
          } else {
            notification("Something went wrong!", "show", "3000");

            // set setSaveThought to false.
            setSaveThought(false);
          }
        });
      }
      createNewThought();
    }
  }
  //! make a request to endpoint Once!!!
  useEffect(() => {
    getUser();
    getUserThoughts();
  }, []);

  //! run funtion to expand textarea when clicked
  function handleWriteNow() {
    setWrite(true);
  }

  //! feedback notification
  function notification(msg, action, time) {
    const notify = document.querySelector(".notification");
    const MSG = document.querySelector(".msg");
    Notification(notify, MSG, msg, action, time);
    // run this
    //? notification(`You can proceed!`, "show", "timer");
  }

  //! handle delete thoughs
  function deleteThought(id) {
    // make a delete request to delete thought
    //! make an asynchronous request to backend endpoint to delete user thought
    async function createNewThought() {
      await axios({
        method: "delete",
        url: import.meta.env.VITE_DATA_URL_API,
        data: JSON.stringify({
          uid: id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then(function (data) {
        if (data.status === 200 || data.statusText === "OK") {
          if (data.data.msg === "success") {
            notification("Thought Deleted!", "show", "3000");
            setTimeout(() => [window.open("/dashboard", "_self")], 500);
          }
        } else {
          notification("Something went wrong!", "show", "3000");
        }
      });
    }
    createNewThought();
  }
  return (
    <>
      {/* notification */}
      <NotificationPop className="notification" textClass="msg" />
      {/* notification */}

      {UserAuth() ? (
        <section>
          <div className="container">
            <div className="dashboard">
              <div className="createThought">
                <h2>
                  <span>
                    <i>Hi, {UserAuth() && userCred.fullname}.</i>
                  </span>{" "}
                  <br /> Spill Out Your Mind, You're Safe!
                </h2>

                <form action="POST" onSubmit={handleSubmit}>
                  <textarea
                    name="mind"
                    id="mind"
                    style={{ height: write ? "100px" : "40px" }}
                    // rows={write ? "4" : "0"}
                    placeholder="Start Writing..."
                    onChange={(e) => setThought(e.target.value)}
                    value={Thought}
                    onClick={handleWriteNow}
                  ></textarea>

                  <div className="keepMyMind">
                    {/* display submit button only if user cliks to start adding thought */}
                    {Thought !== "" ? (
                      !saveThought ? (
                        <Button type="submit" text="Keep My Thought!" />
                      ) : (
                        <Button
                          type="button"
                          disabled="disabled"
                          text="Processing..."
                        />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </form>

                {userThoughts.length !== 0 ? (
                  <div className="myMinds">
                    {userThoughts[0].map((data) => {
                      return (
                        <article key={data._id}>
                          <span className="timeStamp">
                            <span>{data.timeStamp}</span>{" "}
                            <span className="trash">
                              <HiTrash
                                onClick={() => deleteThought(data._id)}
                              />
                            </span>
                          </span>
                          <p>{data.thought}</p>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="noThoughts">
                    <small>
                      Don't tell us you do not have anything on your mind!{" "}
                      <br />
                      Don't worry, Spill it out you're safe! <br />
                      <i>fully-encrypted</i>
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Log user out if not logged in */
        window.open("/", "_self")
      )}
    </>
  );
};

export default Dashboard;
