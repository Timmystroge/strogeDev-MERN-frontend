import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import UserAuth from "../authPages/UserAuth";
import { Notification } from "../authPages/auth.js";
import "./dashboard.css";

const thoughts = [
  {
    id: "1",
    time: "5th May, 2021",
    thought:
      "2 Lorem ipsum dolor sit amet consectetur adipisicing elit Quas dicta veritatis dolores voluptatibus sunt cupiditate",
  },
  {
    id: "2",
    time: "5th May, 2022",
    thought:
      "3 Lorem ipsum dolor sit amet consectetur adipisicing elit Quas dicta veritatis dolores voluptatibus sunt cupiditate",
  },
  {
    id: "3",
    time: "5th May, 2024",
    thought:
      "4 Lorem ipsum dolor sit amet consectetur adipisicing elit Quas dicta veritatis dolores voluptatibus sunt cupiditate",
  },
  {
    id: "4",
    time: "5th May, 2025",
    thought:
      "5 Lorem ipsum dolor sit amet consectetur adipisicing elit Quas dicta veritatis dolores voluptatibus sunt cupiditate",
  },
];

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
  const [userThoughts, setUserThoughts] = useState(thoughts);

  //! make an asynchronous request to backend endpoint to fetch user data
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

  function handleSubmit(e) {
    e.preventDefault();
    if (Thought === "") {
      notification(
        "Baba, You wan submit empty thought? LMAO 😂 ",
        "show",
        "3000"
      );
    } else {
      //! make an asynchronous request to backend endpoint to submit user thought
      async function createNewThought() {
        await axios({
          method: "post",
          url: import.meta.env.VITE_LOCAL_CREATE_URL_API,
          data: JSON.stringify({
            thought: Thought,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }).then(function (data) {
          console.log(data);
        });
      }
      // createNewThought();
    }
  }
  //! make a request to endpoint Once!!!
  useEffect(() => {
    getUser();
  }, []);

  //! run funtion to expand textarea when clicked
  function handleWriteNow() {
    setWrite(true);
  }

  // feedback notification
  function notification(msg, action, time) {
    const notify = document.querySelector(".notification");
    const MSG = document.querySelector(".msg");
    Notification(notify, MSG, msg, action, time);
    // run this
    //? notification(`You can proceed!`, "show", "timer");
  }

  // handle delete thoughs
  function deleteThought(id) {
    setUserThoughts((prev) => {
      return prev.filter((thought) => {
        if (thought.id !== id) {
          notification("Thought Removed! : (", "show", "600");
          return thought;
        }
        notification("Thought Removed! : (", "show", "600");
      });
    });
  }
  return (
    <>
      {/* notification */}
      <div className="notification">
        <p className="msg">Notification Message</p>
      </div>
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
                  <br /> Spill what's on your mind!
                </h2>

                <form action="POST" onSubmit={handleSubmit}>
                  <textarea
                    name="mind"
                    id="mind"
                    rows={write ? "4" : "0"}
                    placeholder="Start Writing..."
                    onChange={(e) => setThought(e.target.value)}
                    value={Thought}
                    onClick={handleWriteNow}
                  ></textarea>
                  <div className="keepMyMind">
                    <button type="submit">Guide My Thought! </button>
                  </div>
                </form>

                {userThoughts.length !== 0 ? (
                  <div className="myMinds">
                    {userThoughts.map((data) => {
                      return (
                        <article key={data.id}>
                          <span className="timeStamp">
                            <span>{data.time}</span>{" "}
                            <span className="trash">
                              <HiTrash onClick={() => deleteThought(data.id)} />
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
                      Na untill i force you to spill out your fucking mind abi?
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
