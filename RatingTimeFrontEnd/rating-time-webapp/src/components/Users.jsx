
import "../App.css";
export default function Users(props) {
  
  if (!Array.isArray(props.users)) {
    return <p>No users available.</p>;
  }
  return (
    <>
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
          {props.users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
