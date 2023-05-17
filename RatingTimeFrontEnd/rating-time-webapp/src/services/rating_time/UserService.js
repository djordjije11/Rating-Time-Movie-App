import {
  errorRefreshPagePopUp,
  invalidUsernamePopUp,
  invalidPasswordPopUp,
  invalidEmailPopUp,
  errorOccurredPopUp,
  invalidLoginCredentials,
  invalidConfirmPasswordPopUp,
  successToastPopUp,
  logoutQuestionPopUpAsync,
} from "../../popups/SwalPopUp";
import UserDefinition from "../../models/UserDefinition";

const AUTH_API_URL = "http://localhost:5165/api/authentication";
const LOGIN_API_URL = "http://localhost:5165/api/authentication/login";
const LOGOUT_API_URL = "http://localhost:5165/api/authentication/logout";
const USER_API_URL = "http://localhost:5165/api/user";
const REGISTER_API_URL = "http://localhost:5165/api/authentication/register";

export default class UserService {
  static validateUsername(username) {
    if (username.length < 3 || username.length > 40) {
      return false;
    }
    return true;
  }
  static validatePassword(password) {
    if (password.length < 8 || password.length > 40) {
      return false;
    }
    if (/[A-Z]/.test(password) === false) {
      return false;
    }
    if (/[a-z]/.test(password) === false) {
      return false;
    }
    if (/\d/.test(password) === false) {
      return false;
    }
    return true;
  }
  static validateEmail(email) {
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) === null) {
      return false;
    }
    return true;
  }

  static async checkAuthAsync() {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(AUTH_API_URL, requestOptions);
    if (response.ok) {
      const responseJson = await response.json();
      const { username, email, role } = responseJson;
      return { username, email, role };
    }
    return null;
  }

  static async loginAsync(user) {
    const { username, password } = user;
    if (this.validateUsername(username) === false) {
      invalidUsernamePopUp();
      return null;
    }
    if (this.validatePassword(password) === false) {
      invalidPasswordPopUp();
      return null;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
      credentials: "include",
    };
    const response = await fetch(LOGIN_API_URL, requestOptions);
    if (response.status === 404) {
      errorOccurredPopUp();
      return null;
    }
    const responseJson = await response.json();
    const role = responseJson.role;
    if (response.status === 400 || role === null) {
      invalidLoginCredentials();
      return null;
    }
    if (response.status === 200) {
      successToastPopUp("Login successfully");
      return responseJson;
    }
  }

  static async registerAsync(user) {
    const { username, email, password, confirmedPassword } = user;
    if (this.validateUsername(username) === false) {
      invalidUsernamePopUp();
      return null;
    }
    if (password !== confirmedPassword) {
      invalidConfirmPasswordPopUp();
      return null;
    }
    if (this.validatePassword(password) === false) {
      invalidPasswordPopUp();
      return null;
    }
    if (this.validateEmail(email) === false) {
      invalidEmailPopUp();
      return null;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
      credentials: "include",
    };
    const response = await fetch(REGISTER_API_URL, requestOptions);
    const responseJson = await response.json();
    if (response.ok === false) {
      errorOccurredPopUp(responseJson.message);
      return null;
    }
    successToastPopUp("Registered successfully");
    const dbUser = {
      username: responseJson.username,
      role: responseJson.role,
    };
    return dbUser;
  }

  static async logoutAsync() {
    const shouldLogout = await logoutQuestionPopUpAsync();
    if (shouldLogout) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      await fetch(LOGOUT_API_URL, requestOptions);
      successToastPopUp("Logout successfully");
      return true;
    }
    return false;
  }

  static async getAllUsersAsync() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    try {
      const response = await fetch(USER_API_URL, requestOptions);
      var dbUsers = [];
      if (response.ok) {
        const responseJson = await response.json();
        dbUsers = responseJson.map((result) => {
          return new UserDefinition(result.username, result.email, result.role);
        });
        return dbUsers;
      }
    } catch (error) {
      console.log(
        "Error while calling rating_time API to get all users!",
        error
      );
    }
    errorRefreshPagePopUp();
    return null;
  }
}
