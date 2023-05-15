import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/rating_time/UserService";
import "../../css/auth/Registration.css";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate();
  const onRegister = props.onRegister;

  const register = async function () {
    const responseJson = await UserService.registerAsync({ username, email, password, confirmedPassword });
    const role = responseJson.role;
    console.log(role);
    const loggedUser = responseJson.username;
    if (role != null) {
      onRegister(loggedUser);
      navigate("/");
    }
  };
  return (
    <div className="registration-body">
      <div className="popcorn">
        <div className="registration-wrapper">
          <h1>Welcome!</h1>
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
              <p>Email</p>
              <input
                name="email"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
            <label>
              <p>Confirm password</p>
              <input
                name="password"
                type="password"
                value={confirmedPassword}
                onChange={(event) => setConfirmedPassword(event.target.value)}
              />
            </label>
          </div>
          <button onClick={register} className="button-28">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
