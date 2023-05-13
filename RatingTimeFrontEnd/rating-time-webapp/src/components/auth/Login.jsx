import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast, swalOptions } from "../../popups/SwalPopUp";
import "../../css/auth/Login.css";
import UserService from "../../services/rating_time/UserService";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAsync = async function () {
    if (username.length < 3 || username.length > 40) {
      Swal.fire({
        ...swalOptions,
        icon: "warning",
        title: "Invalid Username",
        text: "Username must be between 3 and 40 characters",
      });
      return;
    }
    if (password.length < 8 || password.length > 40) {
      Swal.fire({
        ...swalOptions,
        icon: "warning",
        title: "Invalid Password",
        text: "Password must be between 8 and 40 characters",
      });
      return;
    }
    const response = await UserService.loginAsync({ username, password });
    const responseJson = await response.json();
    const role = responseJson.role;
    if (response.status === 404) {
      Swal.fire({
        ...swalOptions,
        icon: "error",
        title: "Try again!",
        text: "Something went wrong",
      });
      return;
    }
    if (response.status === 400 || role === null) {
      Swal.fire({
        ...swalOptions,
        icon: "error",
        title: "Invalid credentials",
        text: "Please check your username and password.",
      });
      return;
    }
    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Login successfully",
      });
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
