import { useEffect } from "react";
import "../App.css";
import UserService from "../services/UserService";
import UserDefinition from "../models/UserDefinition";
import MovieService from "../services/MovieService";
import Swal from "sweetalert2";
import { swalOptions } from "../helper/SwalPopUp";
import { useNavigate } from "react-router-dom";

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
      } else {
        Swal.fire({
          ...swalOptions,
          icon: "warning",
          title: "Please try again.",
          text: "Refresh the page.",
        });
        return;
      }
      setUsers(dbUsers);
    } catch (error) {
      Swal.fire({
        ...swalOptions,
        icon: "warning",
        title: "Please try again.",
        text: "Refresh the page.",
      });
      return;
    }
  };

  const handleUserClick = async (user) => {
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
  };

  useEffect(() => {
    (async () => {
      await getAllUsers();
    })();
  }, []);

  if (Array.isArray(users) === false || users.length === 0) {
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
