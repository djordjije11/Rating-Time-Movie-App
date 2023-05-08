import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserController from "../controllers/UserController";
import { func } from "prop-types";
export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  
  const loginAsync = async function () {
      const response = await UserController.loginAsync({ username, password });
  
      if(response.ok){
        navigate("/");
      }
      else{
        console.error("Error trying to login");
      }
      props.onLogin();
      
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
