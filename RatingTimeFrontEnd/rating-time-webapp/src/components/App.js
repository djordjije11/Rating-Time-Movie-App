import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Home";
import "../App.css";
import Login from "./Login";
import RatedMovies from "./RatedMovies";
import Users from "./Users";
import NavbarComponent from "./NavBarComponent";
import UserService from "../services/UserService";
import MovieService from "../services/MovieService";

export default function App() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  const checkAuth = async () => {
    const response = await UserService.checkAuth();
    if (response.ok) {
      setLoggedIn(true);
      const responseJson = await response.json();
      if (responseJson.role === "Admin") {
        setAdmin(true);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    (async () => {
      if (isLoggedIn) {
        setRatedMovies(await MovieService.getRatedMoviesFromDBAsync());
      }
    })();
  }, [isLoggedIn]);

  const handleLogin = async (role) => {
    if (role === "Admin") {
      setAdmin(true);
    }
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    await UserService.logoutAsync();
    setAdmin(false);
    setLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <BrowserRouter>
        <NavbarComponent isAdmin={isAdmin} onLogout={handleLogout} />
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
