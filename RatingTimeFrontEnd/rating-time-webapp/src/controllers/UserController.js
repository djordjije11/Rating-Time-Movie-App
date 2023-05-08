import UserDefinition from "../models/UserDefinition";

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
      if(response.ok){
        const data = await response.json();
        const role = data.role; 
        return role;
      }
      
      return null;
    }

    static async getAllUsersAsync(){
      const requestOptions = {
        method: "GET",
        headers: {"Content-Type":"application/json"},
        credentials: "include",
      }
      try{
        const response = await fetch(
          USER_API_URL,
          requestOptions
        );
        if(response.ok){
          const responseJson = await response.json();
          const users = responseJson.map((result) => {
            return new UserDefinition(
            result.username,
            result.email,
            result.role
            )
          });
          console.log(users);
          return users;
        } else {
          console.error("Failed to retrieve users");
          return [];
        }
      }catch(error){
        console.error("Error:",error);
        return[];
      }


    }

    // static async getUserAsync(){
    //   const requestOptions = {
    //     method: "GET",
    //     headers: {"Content-Type":"application/json"},
    //     credentials: "include",
    //   }
    //   try{
    //     const response = await fetch(
    //       USER_API_URL,
    //       requestOptions
    //     );
    //     if(response.ok){
    //       const responseJson = await response.json();
    //       const users = responseJson.map((result) => {
    //         return new UserDefinition(
    //         result.username,
    //         result.email,
    //         result.role
    //         )
    //       });
    //       console.log(users);
    //       return users;
    //     } else {
    //       console.error("Failed to retrieve users");
    //       return [];
    //     }
    //   }catch(error){
    //     console.error("Error:",error);
    //     return[];
    //   }
    // }
} export default UserController;
  