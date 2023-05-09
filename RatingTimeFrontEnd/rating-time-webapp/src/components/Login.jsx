import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAsync = async function () {
    if (username.length < 3 || username.length > 40) {
      //ispod username-a
    }
    if (password.length < 8 || password.length > 40) {
      //ispod password-a
    }
    const response = await UserService.loginAsync({ username, password });
    const responseJson = await response.json();
    const role = responseJson.role;
    if (response.status === 404) {
      // pop up message - pokusajte ponovo
    }
    if (response.status === 400 || role === null) {
      // pop up message - losi kredencijali
    }
    props.onLogin(role);
    navigate("/");
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
