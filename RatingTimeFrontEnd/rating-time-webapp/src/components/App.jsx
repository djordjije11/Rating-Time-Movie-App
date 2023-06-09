import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./auth/Login";
import RatedMovies from "./movies/list/RatedMovies";
import Users from "./users/Users";
import NavbarComponent from "./navbar/NavBarComponent";
import UserService from "../services/rating_time/UserService";
import MovieService from "../services/rating_time/MovieService";
import UserRatedMovies from "./movies/list/UserRatedMovies";
import MovieDefinition from "../models/MovieDefinition";
import Register from "./auth/Registration";
import { USER_ROLE_ADMIN } from "../models/UserRoles";
import "../css/SwalPopUp.css";

export default function App() {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(new MovieDefinition());
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");

  const addMovieAsync = async function () {
    const movie = { ...currentMovie };
    const isSaved = await MovieService.addMovieToDBAsync(movie);
    if (isSaved) {
      updateInMemoryRatedMovies(movie);
    }
    setCurrentMovie(null);
  };

  const handleRatingChange = (newRating) => {
    setCurrentMovie((prevMovie) => ({ ...prevMovie, rating: newRating }));
  };

  const checkAuthAsync = async () => {
    const user = await UserService.checkAuthAsync();
    if (user === null) {
      return;
    }
    const { username, role } = user;
    if (role === null) {
      return;
    }
    setLoggedIn(true);
    setLoggedUser(username);
    if (role === USER_ROLE_ADMIN) {
      setAdmin(true);
    }
  };

  const getRatedMoviesAsync = async () => {
    if (isLoggedIn) {
      const ratedMovies = await MovieService.getRatedMoviesFromDBAsync();
      if (ratedMovies !== null) {
        setRatedMovies(ratedMovies);
      }
    }
  };

  useEffect(() => {
    checkAuthAsync();
  }, []);

  useEffect(() => {
    getRatedMoviesAsync();
  }, [isLoggedIn]);

  const updateInMemoryRatedMovies = (movie) => {
    const existingMovieIndex = ratedMovies.findIndex(
      (ratedMovie) => ratedMovie.id === movie.id
    );
    if (existingMovieIndex !== -1) {
      const updatedRatedMovies = [...ratedMovies];
      updatedRatedMovies[existingMovieIndex].rating = movie.rating;
      setRatedMovies(updatedRatedMovies);
    } else {
      setRatedMovies((prev) => [...prev, movie]);
    }
  };

  const handleLogin = async (role, username) => {
    if (role === USER_ROLE_ADMIN) {
      setAdmin(true);
    }
    setLoggedUser(username);
    setLoggedIn(true);
  };

  const handleRegistration = async (username) => {
    setLoggedUser(username);
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    const isLoggedOut = await UserService.logoutAsync();
    if (isLoggedOut) {
      setAdmin(false);
      setLoggedIn(false);
    }
  };

  if (isLoggedIn) {
    return (
      <BrowserRouter>
        <NavbarComponent
          isAdmin={isAdmin}
          onLogout={handleLogout}
          loggedUser={loggedUser}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                ratedMovies={ratedMovies}
                setRatedMovies={setRatedMovies}
                currentMovie={currentMovie}
                setCurrentMovie={setCurrentMovie}
                isZoomed={isZoomed}
                setIsZoomed={setIsZoomed}
                addMovieAsync={addMovieAsync}
                handleRatingChange={handleRatingChange}
              />
            }
          />
          <Route
            path="/rated-movies"
            element={
              <RatedMovies
                ratedMovies={ratedMovies}
                setRatedMovies={setRatedMovies}
                currentMovie={currentMovie}
                setCurrentMovie={setCurrentMovie}
                isZoomed={isZoomed}
                setIsZoomed={setIsZoomed}
                addMovieAsync={addMovieAsync}
                handleRatingChange={handleRatingChange}
              />
            }
          />
          <Route
            path="/users"
            element={isAdmin && <Users users={users} setUsers={setUsers} />}
          />
          <Route path="/rated-movies/:username" element={<UserRatedMovies />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onRegister={handleRegistration} />}
          />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
