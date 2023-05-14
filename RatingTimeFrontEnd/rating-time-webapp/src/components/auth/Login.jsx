import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth/Login.css";
import UserService from "../../services/rating_time/UserService";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onLogin= props.onLogin;

  const loginAsync = async function () {
    const role = await UserService.loginAsync({ username, password });
    if(role !=null){
      onLogin(role);
      navigate("/");
    }
  };

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <h1>Log In</h1>
        <div>
          <label>
            <p>Username</p>
            <input
              name="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <p>Password</p>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <button onClick={loginAsync} className="button-28">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
