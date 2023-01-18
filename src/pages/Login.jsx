import React, { useEffect, useState } from "react";

// Library
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import formData from "form-data";

// Icons
import emailIcon from "../assets/email-svgrepo-com.svg";
import passwordIcon from "../assets/lock-svgrepo-com.svg";
import visible from "../assets/eye-open-svgrepo-com.svg";
import invisible from "../assets/eye-close-svgrepo-com.svg";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [validEml, setValidEml] = useState(false);

  useEffect(() => {
    setValidEml(EMAIL_REGEX.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrMsg("Fill out the form first!");
      setModal(true);
    } else if (!validEml) {
      setErrMsg("The email must be a valid email address.");
      setModal(true);
    }

    let FormData = formData;
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);

    let config = {
      method: "post",
      url: "https://frontendreq.pondokprogrammer.com/api/login",
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.error_message) {
          setErrMsg("Error in email or password");
          setModal(true);
        } else {
          window.localStorage.setItem(
            "token",
            JSON.stringify(response.data.token)
          );
          navigate("/dashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {/* Modal */}
      {modal ? (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-body">{errMsg}</div>
            <div className="modal-footer">
              <button className="btn-close" onClick={() => setModal(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {/*  */}
      <div className="background">
        <div className="shape2" />
        <div className="shape2" />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>
          Welcome Back!<span>Let's log in to your account. </span>
        </h3>
        <div className="wrap-inputs" style={{ marginTop: "90px" }}>
          <label>Email</label>
          <div className="inputBox">
            <img src={emailIcon} alt="emailIcon" className="icon" />
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label>Password</label>
          <div className="inputBox">
            <img src={passwordIcon} alt="passwordIcon" className="icon" />
            <input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {show ? (
              <img
                src={visible}
                alt="visible"
                className="icon toggle-show"
                onClick={() => setShow(!show)}
              />
            ) : (
              <img
                src={invisible}
                alt="invisible"
                className="icon toggle-show"
                onClick={() => setShow(!show)}
              />
            )}
          </div>
        </div>
        <button onClick={handleSubmit}>Sign In</button>
        <p className="link-route">
          I don't have an account yet <Link to="/r">Sign Up</Link>{" "}
        </p>
      </form>
    </>
  );
};

export default Login;
