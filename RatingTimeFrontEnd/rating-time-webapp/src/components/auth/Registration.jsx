import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/rating_time/UserService";
import "../../css/auth/Registration.css";

export default function Register() {
  return (
    <div className="registration-body">
        <div className="popcorn">
        <div className="registration-wrapper">
        <h1>Welcome!</h1>
        <div>
          <label>
            <p>Username</p>
            <input name="username" type="text" />
          </label>
        </div>
        <div>
          <label>
            <p>Email</p>
            <input name="email" type="text" />
          </label>
        </div>
        <div>
          <label>
            <p>Password</p>
            <input name="password" type="password" />
          </label>
        </div>
        <div>
          <label>
            <p>Confirm password</p>
            <input name="password" type="password" />
          </label>
        </div>
        <button /*onClick={register}*/ className="button-28">
            Register
          </button>
        </div>
      </div>
      </div>
  );
}
