import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { swalOptions } from "../popups/SwalPopUp";
import Swal from "sweetalert2";
import UserService from "../../services/rating_time/UserService";
import MovieService from "../../services/rating_time/MovieService";

export default function Users(props) {
  const {users, setUsers} = props;
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const dbUsers = await UserService.getAllUsersAsync();
    if(dbUsers !== null){
      setUsers(dbUsers);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUserClick = async (user) => {
    const userRatedMovies = await MovieService.getUserRatedMoviesAsync(
      user.username
    );
    if (userRatedMovies === null || userRatedMovies.length === 0) {
      Swal.fire({
        ...swalOptions,
        icon: "warning",
        title: `User ${user.username} has not rated any movies yet!`,
      });
      return;
    }
    navigate(`/rated-movies/${user.username}`, {
      state: { ratedMovies: userRatedMovies },
    });
  };

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
