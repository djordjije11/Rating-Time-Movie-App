import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth/Login.css";
import UserService from "../../services/rating_time/UserService";
import { Link } from "react-router-dom";

export default function Login(props) {
  const onLogin = props.onLogin;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAsync = async function () {
    const responseJson = await UserService.loginAsync({ username, password });
    const role = responseJson.role;
    const loggedUser = responseJson.username;
    if (role != null) {
      onLogin(role, loggedUser);
      navigate("/");
    }
  };

  const linkStyle = {
    color: '#263238'
  };

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <h1>Log In</h1>
        <label>
          <p>Username</p>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button onClick={loginAsync} className="button-28">
          Submit
        </button>
        <p className="register-p">Don't have an account?</p>
        <p> <Link to={'/register'} style={linkStyle}>Click here to register!</Link></p>

      </div>
    </div>
  );
}
