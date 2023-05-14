import Swal from "sweetalert2";
import { Toast, swalOptions, errorRefreshPagePopUp } from "../../popups/SwalPopUp";
import UserDefinition from "../../models/UserDefinition";

const AUTH_API_URL = "http://localhost:5165/api/authentication";
const LOGIN_API_URL = "http://localhost:5165/api/authentication/login";
const LOGOUT_API_URL = "http://localhost:5165/api/authentication/logout";
const USER_API_URL = "http://localhost:5165/api/user";


export default class UserService {
  static async checkAuthAsync() {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(AUTH_API_URL, requestOptions);
    if(response.ok){
      const responseJson = await response.json();
      return responseJson.role;
    }
    return null;
  }

  static async loginAsync(user) {
    const {username, password} = user;
    if (username.length < 3 || username.length > 40) {
      Swal.fire({
        ...swalOptions,
        icon: "warning",
        title: "Invalid Username",
        text: "Username must be between 3 and 40 characters",
      });
      return null;
    }
    if (password.length < 8 || password.length > 40) {
      Swal.fire({
        ...swalOptions,
        icon: "warning",
        title: "Invalid Password",
        text: "Password must be between 8 and 40 characters",
      });
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
      Swal.fire({
        ...swalOptions,
        icon: "error",
        title: "Try again!",
        text: "Something went wrong",
      });
      return null; 
    }
    const responseJson = await response.json();
    const role = responseJson.role;
    if (response.status === 400 || role === null) {
      Swal.fire({
        ...swalOptions,
        icon: "error",
        title: "Invalid credentials",
        text: "Please check your username and password.",
      });
      return null; 
    }
    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: "Login successfully",
      });
      return role;
    }
    
  }

  static async logoutAsync() {
    const { value: shouldLogout } = await Swal.fire({
      ...swalOptions,
      title: "Log Out",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Log Out",
      cancelButtonText: "Cancel",
    });
    if (shouldLogout) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      await fetch(LOGOUT_API_URL, requestOptions);
      Toast.fire({
        icon: "success",
        title: "Logout successfully",
      });
    }
  }

  static async getAllUsersAsync() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    try{
      const response = await fetch(USER_API_URL, requestOptions);
      var dbUsers = [];
      if (response.ok) {
        const responseJson = await response.json();
        dbUsers = responseJson.map((result) => {
          return new UserDefinition(result.username, result.email, result.role);
        });
        return dbUsers;
      } 
    } catch(error){
      console.log(
        "Error while calling rating_time API to get all users!",
        error
      );
    }
    errorRefreshPagePopUp();
    return null;
  }
}
