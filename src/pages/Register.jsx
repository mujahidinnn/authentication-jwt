import React, { useEffect, useState } from "react";

// Library
import axios from "axios";
import formData from "form-data";
import { Link, useNavigate } from "react-router-dom";

// Icons
import emailIcon from "../assets/email-svgrepo-com.svg";
import invisible from "../assets/eye-close-svgrepo-com.svg";
import visible from "../assets/eye-open-svgrepo-com.svg";
import infoIcon from "../assets/info-svgrepo-com.svg";
import passwordIcon from "../assets/lock-svgrepo-com.svg";
import userIcon from "../assets/user-svgrepo-com.svg";

// Regex
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  // validation
  const [validEml, setValidEml] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidEml(EMAIL_REGEX.test(email));
    setValidPwd(PWD_REGEX.test(password));
    setValidConfirmPwd(password_confirmation === password);
  }, [email, password, password_confirmation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      password_confirmation === ""
    ) {
      setErrMsg("Complete your personal data first!");
      setModal(true);
    }

    let FormData = formData;
    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("password_confirmation", password_confirmation);

    let config = {
      method: "post",
      url: "http://frontendreq.pondokprogrammer.com/api/register",
      headers: {},
      data: data,
    };

    try {
      await axios(config).then(function (response) {
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
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
        <div className="shape" />
        <div className="shape" />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>
          Welcome <span>Let's create your account!</span>
        </h3>

        <div className="wrap-inputs">
          <label>Username</label>
          <div className="inputBox">
            <img src={userIcon} alt="userIcon" className="icon" />
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label>Email</label>
          <div className="inputBox">
            <img src={emailIcon} alt="emailIcon" className="icon" />
            <input
              type="text"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>
          <div
            className={emailFocus && !validEml ? "instructions" : "offscreen"}
          >
            <img src={infoIcon} alt="info" className="info" />
            <br />
            Example : example@mail.com
            <br />
            Allowed special characters: @ and .
          </div>
          <label>Password</label>
          <div className="inputBox">
            <img src={passwordIcon} alt="passwordIcon" className="icon" />
            <input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
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
          <div className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            <img src={infoIcon} alt="info" className="info" />
            <br />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters: @ # $ %
          </div>
          <label>Confirm Password</label>
          <div className="inputBox">
            <img src={passwordIcon} alt="passwordIcon" className="icon" />
            <input
              type={show2 ? "text" : "password"}
              placeholder="Enter your password"
              required
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              onFocus={() => setConfirmPwdFocus(true)}
              onBlur={() => setConfirmPwdFocus(false)}
            />
            {show2 ? (
              <img
                src={visible}
                alt="visible"
                className="icon toggle-show"
                onClick={() => setShow2(!show2)}
              />
            ) : (
              <img
                src={invisible}
                alt="invisible"
                className="icon toggle-show"
                onClick={() => setShow2(!show2)}
              />
            )}
          </div>
        </div>
        <div
          className={
            confirmPwdFocus && !validConfirmPwd ? "instructions" : "offscreen"
          }
        >
          <img src={infoIcon} alt="info" className="info" />
          <br />
          Password confirmation must match the password
        </div>
        <button onClick={handleSubmit}>Sign Up</button>
        <p className="link-route">
          I have an account <Link to="/">Sign In</Link>{" "}
        </p>
      </form>
    </>
  );
};

export default Register;
