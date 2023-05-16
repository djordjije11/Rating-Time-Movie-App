import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/rating_time/UserService";
import "../../css/auth/Registration.css";

export default function Register(props) {
  const onRegister = props.onRegister;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate();

  const registerAsync = async function () {
    const dbUser = await UserService.registerAsync({
      username,
      email,
      password,
      confirmedPassword,
    });
    if (dbUser.role !== null) {
      onRegister(dbUser.username);
      navigate("/");
    }
  };

  return (
    <div className="registration-body">
      <div className="popcorn">
        <div className="registration-wrapper">
          <h1>Welcome!</h1>
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
            <p>Email</p>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
          <label>
            <p>Confirm password</p>
            <input
              name="password"
              type="password"
              value={confirmedPassword}
              onChange={(event) => setConfirmedPassword(event.target.value)}
            />
          </label>
          <button onClick={registerAsync} className="button-28">
            Register
          </button>
          <p className="register-p">Already have an account?</p>
          <button onClick={() => navigate("/login")} className="button-28">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
