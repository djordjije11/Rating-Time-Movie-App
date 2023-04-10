import React from 'react';

export default function Login() {
  return(
    <div className="login-wrapper">
      <h1>Log In</h1>
        <form>
            <div>
                <label>
                    <p>Username</p>
                    <input type="text" />
                </label>
            </div>
            <div>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}