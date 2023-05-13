const AUTH_API_URL = "http://localhost:5165/api/authentication";
const LOGIN_API_URL = "http://localhost:5165/api/authentication/login";
const LOGOUT_API_URL = "http://localhost:5165/api/authentication/logout";
const USER_API_URL = "http://localhost:5165/api/user";

export default class UserService {
  static checkAuth() {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    return fetch(AUTH_API_URL, requestOptions);
  }

  static loginAsync(user) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
      credentials: "include",
    };
    return fetch(LOGIN_API_URL, requestOptions);
  }

  static logoutAsync() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    return fetch(LOGOUT_API_URL, requestOptions);
  }

  static getAllUsersAsync() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    return fetch(USER_API_URL, requestOptions);
  }
}
