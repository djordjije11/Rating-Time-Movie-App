import { useEffect } from "react";
import Swal from "sweetalert2";
import { errorRefreshPagePopUp, swalOptions } from "../../popups/SwalPopUp";
import { useNavigate } from "react-router-dom";
import UserDefinition from "../../models/UserDefinition";
import UserService from "../../services/rating_time/UserService";
import MovieService from "../../services/rating_time/MovieService";
import "../../css/users/Users.css";
import "../../css/SwalPopUp.css";
export default function Users(props) {
  const [users, setUsers] = [props.users, props.setUsers];
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await UserService.getAllUsersAsync();
      var dbUsers = [];
      if (response.ok) {
        const responseJson = await response.json();
        dbUsers = responseJson.map((result) => {
          return new UserDefinition(result.username, result.email, result.role);
        });
        if(dbUsers.length===0){
          Swal.fire({
            ...swalOptions,
            icon: "warning",
            title: "No users to display!",
          }).then(() => {
          navigate('/'); 
        });
          return;
        }
        setUsers(dbUsers);
      } else {
        errorRefreshPagePopUp();
      }
    } catch (error) {
      errorRefreshPagePopUp();
      console.log(
        "Error while calling rating_time API to get all users!",
        error
      );
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUserClick = async (user) => {
    try {
      const userRatedMovies = await MovieService.getUserRatedMoviesAsync(
        user.username
      );
      if (userRatedMovies.length === 0) {
        Swal.fire({
          ...swalOptions,
          icon: "warning",
          title: `User ${user.username} has not rated any movies yet!`,
        });
        return;
      } else {
        navigate(`/rated-movies/${user.username}`, {
          state: { ratedMovies: userRatedMovies },
        });
      }
    } catch (error) {
      errorRefreshPagePopUp();
      console.log(
        "Error while calling rating_time API to get all ratings from a user!",
        error
      );
    }
  };

 
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
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => handleUserClick(user)}
            >
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
