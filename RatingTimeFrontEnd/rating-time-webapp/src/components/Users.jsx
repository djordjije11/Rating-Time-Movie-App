import { useEffect } from "react";
import "../App.css";
import UserService from "../services/UserService";
import UserDefinition from "../models/UserDefinition";

export default function Users(props) {
  const isAdmin = props.isAdmin;
  const [users, setUsers] = [props.users, props.setUsers];

  const getAllUsers = async () => {
    try {
      if (isAdmin) {
        const response = await UserService.getAllUsersAsync();
        var dbUsers = [];
        if (response.ok) {
          const responseJson = await response.json();
          dbUsers = responseJson.map((result) => {
            return new UserDefinition(
              result.username,
              result.email,
              result.role
            );
          });
        } else {
          //hendlovati error...
          console.error("Failed to retrieve users");
        }
        setUsers(dbUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllUsers();
    })();
  }, []);

  if (Array.isArray(users) === false) {
    return <p>No users available.</p>;
  }

  return (
    <div>
      <table className="table-container">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
