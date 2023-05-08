
const LOGIN_API_URL = "http://localhost:5165/api/authentication/login";
const USER_API_URL ="http://localhost:5165/api/user";
class UserController {
    
    static async loginAsync(props) {
      console.log(props.username);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: props.username, 
          password: props.password }),
        credentials: "include",
      };
      console.log("HEJ");
      const response = await fetch(
        LOGIN_API_URL,
        requestOptions
      );
      console.log(response);
      return response;
    }

   
}
  
  export default UserController;
  