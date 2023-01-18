import React, { useState, useEffect } from "react";

// Icon
import logoutIcon from "../assets/logout-bracket-svgrepo-com.svg";

// Library
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/");
    }
    const gettoken = JSON.parse(window.localStorage.getItem("token"));
    setToken(gettoken);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    let config = {
      method: "post",
      url: "https://frontendreq.pondokprogrammer.com/api/logout",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        window.localStorage.removeItem("token");
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Time
  const [time, setTime] = useState("");
  function formatTime(val) {
    if (val < 10) {
      return "0";
    } else {
      return "";
    }
  }
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    const day = new Date();
    const hour = day.getHours();
    const minute = day.getMinutes();
    const second = day.getSeconds();

    setTime(
      `${formatTime(hour)}${hour}:${formatTime(minute)}${minute}:${formatTime(
        second
      )}${second}`
    );
  }

  return (
    <div className="container-dashboard">
      {/* Modal */}
      {modal ? (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-body">
              <p style={{ fontSize: "30px", marginTop: "100px" }}>
                Do you want to log out?
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-logout"
                style={{
                  float: "left",
                  padding: "0.9em 2em",
                  marginTop: "100px",
                }}
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-close"
                style={{
                  marginTop: "100px",
                }}
                onClick={handleLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {/*  */}
      <div className="wrap">
        <p className="desc">{time}</p>
        <h1 className="title">Dashboard</h1>
        <p className="desc">This is dashboard page</p>
        <button onClick={() => setModal(true)} className="btn-logout">
          <img src={logoutIcon} alt="" className="icon" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
