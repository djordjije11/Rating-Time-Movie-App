const AUTH_API_URL = "http://localhost:5165/api/authentication";
const LOGIN_API_URL = "http://localhost:5165/api/authentication/login";
const LOGOUT_API_URL = "http://localhost:5165/api/authentication/logout";
const USER_API_URL = "http://localhost:5165/api/user";
export default class UserService {
  static async checkAuth() {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(AUTH_API_URL, requestOptions);
    return response;
  }

  static async loginAsync(user) {
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
    return response;
  }

  static async logoutAsync() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    const response = await fetch(LOGOUT_API_URL, requestOptions);
    return response;
  }

  static async getAllUsersAsync() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    const response = await fetch(USER_API_URL, requestOptions);
    return response;
  }

}
