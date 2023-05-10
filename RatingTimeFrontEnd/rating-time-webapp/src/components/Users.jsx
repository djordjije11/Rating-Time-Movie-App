import { useEffect } from "react";
import "../App.css";
import UserService from "../services/UserService";
import UserDefinition from "../models/UserDefinition";
import MovieService from "../services/MovieService";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function Users(props) {
  const isAdmin = props.isAdmin;
  const [users, setUsers] = [props.users, props.setUsers];
  const navigate= useNavigate();

  const swalOptions = {
    customClass: {
      container: 'custom-container-class',
      title: 'custom-title-class',
      content: 'custom-content-class',
      confirmButton: 'custom-confirm-button-class',
    },
  };

  useEffect(() => {
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
            console.error("Failed to retrieve users");
          }
          setUsers(dbUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    (async () => {
      await getAllUsers();
    })();
  }, []);

  const handleUserClick = async (user) => {
    const ratedMoviesResponse = await MovieService.getUserRatedMoviesAsync(user.username);
    if (ratedMoviesResponse.length === 0) {
      Swal.fire({
        ...swalOptions,
        icon: "warning",
        title: `User ${user.username} has not rated any movies yet!`,
      });
      return;
    }
    else{
      navigate(`/rated-movies/${user.username}`, {
        state: { ratedMovies: ratedMoviesResponse },
      });
    }
  };

 
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
            <tr key={index} style={{cursor:"pointer"}} onClick={() => handleUserClick(user)}>
              <td > 
                  {user.username}
                </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
