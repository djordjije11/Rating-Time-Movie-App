import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

export default function NavbarComponent(props) {
  const onLogout = props.onLogout;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="..." height="75" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              className="text-decoration-none text-white"
              to="/"
              style={{ marginRight: "30px", fontSize: "20px" }}
            >
              Home
            </Link>
            <Link
              className="text-decoration-none text-white"
              to="/rated-movies"
              style={{ marginRight: "30px", fontSize: "20px" }}
            >
              Rated movies
            </Link>
            {props.isAdmin && (
              <Link
                className="text-decoration-none text-white"
                to="/users"
                style={{ fontSize: "20px" }}
              >
                Users
              </Link>
            )}
            <Link
              className="text-decoration-none text-white"
              to="/"
              onClick={onLogout}
              style={{ marginLeft: "800px", fontSize: "20px" }}
            >
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
