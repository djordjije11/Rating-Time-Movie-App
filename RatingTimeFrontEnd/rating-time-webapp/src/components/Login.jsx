import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginAsync = async function () {
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, 
        password: password }),
      credentials: "include",
    };
    console.log("HEJ");
    const response = await fetch(
      "http://localhost:5165/api/authentication/login",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
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
        <button onClick={loginAsync} className="button-28">Submit</button>
      </div>
    </div>
    </div>
  );
}
