import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Home";
import "../App.css";
import Login from "./Login";
import RatedMovies from "./RatedMovies";
import Users from "./Users";
import NavbarComponent from "./NavBarComponent";

export default function App() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //proveriti na osnovu cookie-a da li je korisnik loggedin
    //poslati api da trazi ulogu korisnika
  });

  const handleLogin = async (role) => {
    console.log(role);
    if (role === "Admin") {
      setAdmin(true);
    }
    setLoggedIn(true);
  };

  if (isLoggedIn) {
    return (
      <BrowserRouter>
        <NavbarComponent isAdmin={isAdmin} />
        <Routes>
          <Route
            path="/"
            element={
              <Home ratedMovies={ratedMovies} setRatedMovies={setRatedMovies} />
            }
          />
          <Route
            path="/rated-movies"
            element={
              <RatedMovies
                ratedMovies={ratedMovies}
                setRatedMovies={setRatedMovies}
              />
            }
          />
          <Route
            path="/users"
            element={
              isAdmin && (
                <Users users={users} setUsers={setUsers} isAdmin={isAdmin} />
              )
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
