import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import React, { useState } from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import "../App.css";
import Login from "./Login";
import RatedMovies from "./RatedMovies";
import UserController from "../controllers/UserController";
import Users from "./Users";

function App() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [isLoggedIn, setLoggedIn]= useState(false);
  const [role, setRole] = useState("admin");
  const [users, setUsers] = useState([]);

  const handleLogin = async () =>{
    setLoggedIn(true);
    const users = await UserController.getAllUsersAsync();
    setUsers(users);
    console.log(users);
  }
  return (
    <BrowserRouter>
         {isLoggedIn && <NavBar role={role}/>}
         <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home ratedMovies={ratedMovies} setRatedMovies={setRatedMovies} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/rated-movies"
          element={
            isLoggedIn ? (
              <RatedMovies
                ratedMovies={ratedMovies}
                setRatedMovies={setRatedMovies}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/users"
          element={
            isLoggedIn ? (
              <Users
                users={users}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
