import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../config/config";
import { generateRequestId, messageBox } from "../Services";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Login(props) {
  // React States
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.sessionId) {
      setIsSubmitted(true);
      props.onLogin();
    }
  }, [props]);

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = event.target.elements;
    console.log(
      "Submitting login request with credentials:",
      uname.value,
      pass.value
    );

    const loginRequest = {
      schemaVersion: "1.0",
      requestId: generateRequestId(),
      timestamp: Date.now(),
      channel: "Web",
      requestBody: {
        serviceCode: "0101",
        serviceName: "adminLogin",
      },
      requestHeader: {
        userType: "ADMIN",
        username: uname.value,
        password: pass.value,
      },
    };

    try {
      const response = await axios.post(
        config.billingServer + "/adminservices/login",
        loginRequest
      );

      const res = response.data.responseBody;
      if (res.statusMessage === "SUCCESS") {
        sessionStorage.sessionId = res.sessionId;
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            userId: res.userId,
            userName: uname.value,
            permissions: res.permissions,
            sessionId: res.sessionId,
          })
        );
        setIsSubmitted(true);
        props.onLogin();
      } else messageBox("danger", res.statusMessage);
    } catch (error) {
      console.error(error);

      messageBox(
        "danger",
        "Could not connect to server, please contact support team."
      );
    }
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} />
          <input type="text" placeholder="User Name" name="uname" required />
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} />
          <input type="password" placeholder="Password" name="pass" required />
        </div>
        <div className="button-container">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login-form">
      {isSubmitted ? null : (
        <>
          <div className="title">Admin Login</div>
          {renderForm}
        </>
      )}
    </div>
  );
}

export default Login;
